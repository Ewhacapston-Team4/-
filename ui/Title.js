import { StyleSheet, Text } from "react-native";

function Title({ children }) {
  return <Text style={[styles.Text]}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  Text: {
    fontFamily: "nnsq-bold",
    fontSize: 28,
    paddingBottom: 20,
  },
});
