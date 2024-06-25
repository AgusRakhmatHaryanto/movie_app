import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

export default function MovieDetail({ navigation }: any): any {
  const fetchData = () => {
    const ACCESS_TOKEN =
      "YOUR_ACCESS_TOKEN_HERE";

    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Movie Detail Page</Text>
      <CustomButton
        title="Fetch Data"
        onPress={() => fetchData()}
        backgroundColor="black"
        color="white"
        fontSize={16}
        width={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30
  }
})