import React from "react";
import { View, Text ,StyleSheet} from "react-native";
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
        title="MovieDetail"
        onPress={() => navigation.navigate("MovieDetail")}
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