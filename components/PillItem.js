import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { useState } from "react";

import Colors from "../constants/Colors";

function PillItem({ pillName, imageUrl, summary, style }) {
  return (
    <Pressable style={styles.button}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.text}>{pillName}</Text>
    </Pressable>
  );
}

export default PillItem;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    height: 100,
    margin: 2,
    borderRadius: 8,
    backgroundColor: Colors.grey3,
    width: "32%",
    paddingTop: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    flex: 0.6,
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    maxHeight: 60,
  },
  text: { flex: 0.4, fontFamily: "noto-sans-bold", fontSize: 15 },
});
