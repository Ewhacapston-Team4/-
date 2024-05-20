import { StyleSheet, Text } from "react-native";

function Title1({ children, style }) {
  return <Text style={[styles.Text, style]}>{children}</Text>;
}

export default Title1;

const styles = StyleSheet.create({
  Text: {
    fontFamily: "nnsq-black",
    fontSize: 40,
    paddingBottom: 20,
    lineHeight: 48,
  },
});
