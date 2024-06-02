import { StyleSheet, Text } from "react-native";

function Title({ children, type }) {
  return (
    <Text style={type === "home" ? styles.Text : styles.small}>{children}</Text>
  );
}

export default Title;

const styles = StyleSheet.create({
  Text: {
    fontFamily: "nnsq-bold",
    fontSize: 30,
    paddingBottom: 20,
  },
  small: {
    fontFamily: "nnsq-bold",
    fontSize: 25,
    paddingBottom: 10,
  },
});
