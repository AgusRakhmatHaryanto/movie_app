import { Text, View } from "react-native";
import { useState } from "react";
import config from "../config";

export default function CategorySearch(): JSX.Element {
  const { API_ACCESS_TOKEN } = config;
  const [collection, setCollection] = useState([]);
  return (
    <View>
      <Text>CategorySearch</Text>
    </View>
  );
}
