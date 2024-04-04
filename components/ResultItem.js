import { StyleSheet, View, Text } from "react-native";

import Colors from "../constants/Colors";

function ResultItem({ title, value }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
      <View>
        <Text style={styles.valueStyle}>{value}</Text>
      </View>
    </View>
  );
}

export default ResultItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleStyle: {
    fontFamily: "nnsq-bold",
    fontSize: 22,
    paddingRight: 15,
  },
  valueStyle: {
    fontFamily: "nnsq-regular",
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.grey1,
    backgroundColor: "#CAD6D566",
    overflow: "hidden",
    padding: 5,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
