import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import KeywordSearch from "../components/search/KeywordSearch";
import CategorySearch from "../components/search/CategorySearch";

export default function Search(): JSX.Element {
  const [selectedBar, setSelectedBar] = useState<string>("keyword");

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topBarContainer}>
          {["keyword", "category"].map((item: string, index: number) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.9}
              style={[
                styles.topBar,
                item === selectedBar
                  ? styles.topBarSelected
                  : styles.topBarUnselected,
                index === 0 && styles.topBarLeft,
                index === 1 && styles.topBarRight,
              ]}
              onPress={() => {
                setSelectedBar(item);
              }}
            >
              <Text style={styles.topBarLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedBar === "keyword" ? <KeywordSearch /> : <CategorySearch />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topBarContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  topBar: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 60,
  },
  topBarSelected: {
    backgroundColor: "#8978A4",
  },
  topBarUnselected: {
    backgroundColor: "#C0B4D5",
  },
  topBarLeft: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  topBarRight: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  topBarLabel: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
    textTransform: "capitalize",
  },
});
