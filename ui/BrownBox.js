import { View, StyleSheet, Text } from "react-native";

import Colors from "../constants/Colors";

function BrownBox({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

export default BrownBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey3,
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
  text: { fontFamily: "nnsq-regular", fontSize: 20 },
});
