import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MovieDetail from "../screens/MovieDetail";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigation(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="HomeMain">
            <Stack.Screen
                name="HomeMain"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Movie Detail"
                component={MovieDetail} 
            />
        </Stack.Navigator>
    );
}
