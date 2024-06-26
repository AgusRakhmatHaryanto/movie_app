import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import MovieItem from "../components/movies/MovieItem";
import config from "../components/config";

const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 100,
    height: 160,
  },
};

export default function MovieDetail({ route }: any): JSX.Element {
  const { movie, size, coverType } = route.params.data;
  const [recomendations, setRecomendations] = React.useState([]);
  const { API_ACCESS_TOKEN, API_URL_RECOMEND } = config;

  const getRecomendList = (): void => {
    const url = `${API_URL_RECOMEND}/${movie.id}/recommendations`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => setRecomendations(response.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getRecomendList();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        style={[size, styles.backgroundImage]}
        imageStyle={styles.backgroundImageStyle}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${
            coverType === "backdrop" ? movie.backdrop_path : movie.poster_path
          }`,
        }}
      >
        <LinearGradient
          colors={["#00000000", "rgba(0, 0, 0, 0.7)"]}
          locations={[0.6, 0.8]}
          style={styles.gradientStyle}
        >
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="yellow" />
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <Text style={styles.overview}>{movie.overview}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Original Language</Text>
            <Text style={styles.infoText}>{movie.original_language}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Release Date</Text>
            <Text style={styles.infoText}>{movie.release_date}</Text>
          </View>
        </View>
        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Popularity</Text>
            <Text style={styles.infoText}>{movie.popularity}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Vote Count</Text>
            <Text style={styles.infoText}>{movie.vote_count}</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.header}>
          <View style={styles.purpleLabel}></View>
          <Text style={styles.title}>Recommendation</Text>
        </View>
        <FlatList
          style={styles.movieList}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={recomendations}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              size={coverImageSize.poster}
              coverType={coverType}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 32,
  },
  overview: {
    color: "black",
    fontSize: 16,
    textAlign: "justify",
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  rating: {
    color: "yellow",
    fontWeight: "700",
  },
  movieTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  gradientStyle: {
    padding: 8,
    height: "100%",
    width: "100%",
    borderRadius: 8,
    display: "flex",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 30,
  },
  backgroundImage: {
    height: 200,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  backgroundImageStyle: {
    borderRadius: 8,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    width: "90%",
  },
  infoColumn: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
  infoRow: {
    alignItems: "center",
    marginVertical: 5,
  },
  infoTitle: {
    fontSize: 19,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  purpleLabel: {
    width: 5,
    height: 24,
    backgroundColor: "purple",
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  movieList: {
    paddingHorizontal: 12,
  },
});
