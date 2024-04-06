import { StyleSheet, View, Text } from "react-native";

import Colors from "../constants/Colors";

function ResultItem({ title, value, info }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
      <View>
        <Text style={styles.valueStyle}>{value}</Text>
      </View>
      {info !== null ? (
        <View>
          <Text style={styles.infoStyle}>{info}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.infoStyle}>인식 안됨</Text>
        </View>
      )}
    </View>
  );
}

export default ResultItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
  titleStyle: {
    fontFamily: "nnsq-bold",
    fontSize: 22,
    paddingRight: 15,
    minWidth: 120,
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
  infoStyle: {
    fontFamily: "nnsq-regular",
    fontSize: 20,
    overflow: "hidden",
    padding: 5,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
