import React from "react";
import { View, StyleSheet, Text } from "react-native"; 
import CustomButton from "../components/CustomButton";
import config from "../components/config";

export default function MovieDetail({ navigation }: any): any {
  const fetchData = (): void => {
    if (config.API_URL == null || config.API_ACCESS_TOKEN.length == null) {
      throw new Error("ENV not found");
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
         Authorization: `Bearer ${config.API_ACCESS_TOKEN}`,
      },
    };

    fetch(config.API_URL, options)
      .then(async (response) =>await response.json())
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
    fontSize: 30,
  },
});
