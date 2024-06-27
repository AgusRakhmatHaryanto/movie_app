import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import config from "../config";
import { Movie } from "../../types/app";
import MovieItem from "../movies/MovieItem";

export default function CategorySearch(): JSX.Element {
  const {
    API_ACCESS_TOKEN,
    API_URL_GENRE_LIST,
    API_URL_SEARCH_MOVIE_BY_GENRE,
  } = config;
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getGenreList();
  }, []);

  useEffect(() => {
    if (selectedGenres.length > 0) {
      getMovieByGenre(selectedGenres);
    }
  }, [selectedGenres]);

  const getGenreList = async () => {
    const url = `${API_URL_GENRE_LIST}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };
    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => setGenres(response.genres))
      .catch((err) => console.error(err));
  };

  const getMovieByGenre = async (genreIds: number[]) => {
    const genreIdsString = genreIds.join(",");
    console.log("genreIdsString:", genreIdsString);
    const url = `${API_URL_SEARCH_MOVIE_BY_GENRE}${genreIdsString}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };
    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  };

  const toggleGenreSelection = (genreId: number) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genreId)) {
        return prevSelectedGenres.filter((id) => id !== genreId);
      } else {
        return [...prevSelectedGenres, genreId];
      }
    });
  };

  const renderGenreItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => toggleGenreSelection(item.id)}
      style={[
        styles.genreItem,
        selectedGenres.includes(item.id) && styles.selectedGenreItem,
      ]}
    >
      <Text style={styles.genreName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Movie Detail", {
          data: {
            movie: item,
            coverType: "backdrop",
            size: { width: "100%", height: 200 },
          },
        })
      }
    >
      <View style={styles.collectionItem}>
        <MovieItem
          movie={item}
          size={{ width: "100%", height: 200 }}
          coverType="poster" 
          style={styles.movieItem}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={genres}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGenreItem}
        horizontal
        ItemSeparatorComponent={() => <View style={styles.genreSeparator} />}
        style={{ marginBottom: 20 }}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        ItemSeparatorComponent={() => <View style={styles.movieSeparator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  genreItem: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
  },
  selectedGenreItem: {
    backgroundColor: "#d1e7dd",
  },
  genreName: {
    fontSize: 16,
  },
  movieItem: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  genreSeparator: {
    width: 10,
  },
  movieSeparator: {
    height: 10,
  },
  collectionItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
});
