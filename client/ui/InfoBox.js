import { Text, View, StyleSheet } from "react-native";

import Title from "./Title";
import Colors from "../constants/Colors";

function InfoBox({ title, children, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

export default InfoBox;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.grey1,
    backgroundColor: "#CAD6D566",
    overflow: "hidden",
    marginTop: 5,
    paddingBottom: 10,
  },
  title: {
    fontFamily: "noto-sans-medium",
    fontSize: 25,
    //paddingVertical: 10,
    marginBottom: -10,
    paddingLeft: 20,
  },
});
