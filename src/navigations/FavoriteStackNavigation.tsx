import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorite from "../screens/Favorit";
import MovieDetail from "../screens/MovieDetail";

const Stack = createNativeStackNavigator();

export default function FavoriteStackNavigation(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="FavoriteMain">
            <Stack.Screen
                name="FavoriteMain"
                component={Favorite}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Movie Detail"
                component={MovieDetail} 
            />
        </Stack.Navigator>
    );
}
