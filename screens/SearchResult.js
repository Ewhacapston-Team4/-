import { Text, View, StyleSheet } from "react-native";
import React from "react";

import Colors from "../constants/Colors";
import Title1 from "../ui/Title1";
import Box from "../ui/Box";

function SearchResult() {
  return (
    <View style={styles.container}>
      <Title1>검색 결과</Title1>
      <Box></Box>
    </View>
  );
}

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
});
