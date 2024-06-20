import { StyleSheet, View, Text } from "react-native";

import Colors from "../constants/Colors";
import TTS from "./TTS";

function ResultItem({ title, value, info, type }) {
  let content;

  if (type === "date") {
    content = (
      <View style={styles.container}>
        <View>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
        <View>
          <Text style={styles.valueStyle}>{value}</Text>
        </View>
      </View>
    );
  } else {
    content = (
      <View style={styles.container}>
        <View>
          <Text style={styles.index}>{title}</Text>
        </View>
        <View style={styles.newContainer}>
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
      </View>
    );
  }
  return <>{content}</>;
}

export default ResultItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  titleStyle: {
    fontFamily: "nnsq-bold",
    fontSize: 25,
    paddingRight: 15,
  },
  valueStyle: {
    fontFamily: "nnsq-regular",
    fontSize: 25,
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
    fontSize: 25,
    overflow: "hidden",
    padding: 5,
    textAlign: "center",
    textAlignVertical: "center",
  },
  index: {
    fontFamily: "nnsq-bold",
    fontSize: 20,
    paddingRight: 15,
  },
  newContainer: {},
});
