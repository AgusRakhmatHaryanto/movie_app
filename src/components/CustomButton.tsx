import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    color?: string;
    fontSize?: number;
    width?: number;
}
export default function CustomButton (
    {
        title,
        onPress,
        backgroundColor = "black",
        color = "white",
        fontSize = 16,
        width = 200
    }: CustomButtonProps
){
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, {backgroundColor, width}]}
        >
            <Text style={[styles.text, {color, fontSize}]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3
    },
    text: {
        fontSize: 16
    }
})