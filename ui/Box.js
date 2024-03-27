import { View, StyleSheet, Text } from "react-native";

import Title from "./Title";

function Box({ title, children }) {
  return (
    <View style={styles.container}>
      <Title>{title}</Title>
      {children}
    </View>
  );
}

export default Box;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    height: "200px,",
    paddingHorizontal: 25,
    paddingVertical: 30,
    elevation: 4,
    marginVertical: 5,
  },
});
