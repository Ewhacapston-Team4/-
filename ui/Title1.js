import { StyleSheet, Text } from "react-native";

function Title1({ children, style }) {
  return <Text style={[styles.Text, style]}>{children}</Text>;
}

export default Title1;

const styles = StyleSheet.create({
  Text: {
    fontFamily: "nnsq-bold",
    fontSize: 30,
    paddingBottom: 20,
  },
});
