import { Text, View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

import { Colors } from "react-native/Libraries/NewAppScreen";
import Box from "../ui/Box";

function SearchBox({ placeholder, keyword, onChangeText }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" color={Colors.grey1} size={30} />
      <TextInput
        style={styles.inputContainer}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={keyword}
      />
    </View>
  );
}

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 8,
  },
  inputContainer: {
    paddingLeft: 5,
    fontSize: 20,
    textAlignVertical: "center",
  },
});
