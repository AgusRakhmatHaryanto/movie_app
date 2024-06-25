import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomButton from "../components/CustomButton";

export default function Home({navigation}: any): JSX.Element {
  return (
    <View style={styles.container}>
      <Text
      style={styles.text}
      >
        Home
      </Text>
      <CustomButton
        title="Movie Detail"
        onPress={() => navigation.navigate("Movie Detail")}
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