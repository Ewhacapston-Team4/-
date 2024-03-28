import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { useState } from "react";

import Colors from "../constants/Colors";

function PillItem({ pillName, imageUrl, summary, style }) {
  return (
    <View style={[styles.pillItem, style]}>
      <Pressable style={styles.button}>
        <View style={styles.innerContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.text}>{pillName}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default PillItem;

const styles = StyleSheet.create({
  pillItem: {
    flex: 1,
    height: 100,
    margin: 2,
    borderRadius: 8,
    backgroundColor: Colors.grey3,
  },
  button: { flex: 1 },
  innerContainer: {
    flex: 1,
    paddingTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "noto-sans-bold",
    fontSize: 15,
  },
  image: {
    flex: 1,
    width: 70,
  },
});
