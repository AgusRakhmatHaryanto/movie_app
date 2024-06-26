import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Movie } from "../types/app";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [isFavorite, setIsFavorite] = React.useState(false);

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");
      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = JSON.parse(initialData);
      }

      favMovieList.push(movie);

      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(favMovieList));
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");

      if (initialData !== null) {
        let favMovieList: Movie[] = JSON.parse(initialData);
        favMovieList = favMovieList.filter((movie) => movie.id !== id);

        await AsyncStorage.setItem(
          "@FavoriteList",
          JSON.stringify(favMovieList)
        );
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const checkIsFavorite = async (): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");

      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData);
        const isFav = favMovieList.some((favMovie) => favMovie.id === movie.id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  const toggleFavorite = (): void => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

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
    checkIsFavorite();
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
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="yellow" />
                <Text style={styles.rating}>
                  {movie.vote_average.toFixed(1)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={toggleFavorite}
            >
              <FontAwesome
                name="heart"
                size={24}
                color={isFavorite ? "red" : "white"}
              />
            </TouchableOpacity>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 12,
  },
  favoriteButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 8,
    borderRadius: 100,
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
    // alignContent: "center",
  },
  infoRow: {
    // alignItems: "center",
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

  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 12,
    marginTop: 12,
  },
  favoriteActive: {
    backgroundColor: "red",
  },
  favoriteButtonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
