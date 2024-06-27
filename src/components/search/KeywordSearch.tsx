import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import config from "../config";
import { Movie } from "../../types/app";
import MovieItem from "../movies/MovieItem";

export default function KeywordSearch(): JSX.Element {
  const [collections, setCollections] = useState<Movie[]>([]);
  const [text, setText] = useState<string>("");
  const { API_ACCESS_TOKEN, include, API_URL_SEARCH_KEYWORD } = config;
  const navigation = useNavigation();

  const handleSearch = (): void => {
    const url = `${API_URL_SEARCH_KEYWORD}${encodeURIComponent(text)}${include}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => setCollections(response.results))
      .catch((err) => console.error(err));
  };

  const navigateToMovieDetail = (movie: Movie) => {
    navigation.navigate("Movie Detail", {
      data: {
        movie,
        coverType: "backdrop",
        size: { width: "100%", height: 200 },
      },
    });
  };

  const renderMovieItem = ({ item }: { item: Movie }) => {
    return (
      <TouchableOpacity onPress={() => navigateToMovieDetail(item)}>
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
  };

  return (
    <View style={{ padding: 20 }}>
      {/* <Text>Keyword Search</Text> */}
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Enter keyword"
        value={text}
        onChangeText={setText}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={collections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  collectionItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    overflow: "hidden",
  },
  collectionDescription: {
    marginTop: 10,
  },
  movieItem: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
});
