import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "../screens/Search";
import MovieDetail from "../screens/MovieDetail";


const Stack = createNativeStackNavigator();

export default function SearchStackNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="SearchMain">
      <Stack.Screen
        name="SearchMain"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Movie Detail" component={MovieDetail} />
    </Stack.Navigator>
  );
}
