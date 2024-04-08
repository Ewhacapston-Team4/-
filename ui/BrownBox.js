import { View, StyleSheet, Text, Pressable } from "react-native";

import Colors from "../constants/Colors";

function BrownBox({ children, type }) {
  return (
    <View
      style={type === "checked" ? styles.checkedContainer : styles.container}
    >
      <Text style={type === "checked" ? styles.checkedText : styles.text}>
        {children}
      </Text>
    </View>
  );
}

export default BrownBox;

const styles = StyleSheet.create({
  checkedContainer: {
    backgroundColor: Colors.grey3,
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
  container: {
    backgroundColor: Colors.point,
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
  checkedText: { fontFamily: "nnsq-regular", fontSize: 20, color: "#adadad" },
  text: { fontFamily: "nnsq-bold", fontSize: 20 },
});
