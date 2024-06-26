import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import MovieItem from "../components/movies/MovieItem";
import { Movie } from "../types/app";

export default function Favorite(): JSX.Element {
  const navigation = useNavigation();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("@FavoriteList");
        if (storedFavorites !== null) {
          const favorites = JSON.parse(storedFavorites);
          setFavoriteMovies(favorites);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
  
    fetchFavoriteMovies();
  }, [favoriteMovies]); // Add favoriteMovies to the dependency array
  

  const navigateToMovieDetail = (movie: Movie) => {
    console.log("Navigating to MovieDetail with movie:", movie);
    navigation.navigate("Movie Detail", { data: { movie, coverType: "backdrop", size: { width: "100%", height: 200 } } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      {favoriteMovies.length === 0 ? (
        <Text style={styles.message}>No favorite movies yet.</Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToMovieDetail(item)}>
              <MovieItem
                movie={item}
                size={{ width: "100%", height: 200 }}
                coverType="backdrop"
                style={styles.movieItem}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    fontStyle: "italic",
  },
  flatListContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  movieItem: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  separator: {
    height: 8,
  },
});
