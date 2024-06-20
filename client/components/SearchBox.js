import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

import { Colors } from "react-native/Libraries/NewAppScreen";

function SearchBox({
  placeholder,
  keyword,
  onChangeText,
  onPress,
  onFocus,
  editable,
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Ionicons name="search" color={Colors.grey1} size={30} />
        <TextInput
          style={styles.inputContainer}
          placeholder={placeholder}
          placeholderTextColor={"grey"}
          onChangeText={onChangeText}
          value={keyword}
          onFocus={onFocus}
          editable={editable}
        />
      </View>
    </Pressable>
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
    fontFamily: "nnsq-bold",
  },
});
