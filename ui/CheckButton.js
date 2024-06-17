import { Pressable, Text, View, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

function CheckButton({ title, onCheck, number }) {
  return (
    <Pressable style={!onCheck ? styles.container : styles.checkedContainer}>
      {number === "1" && (
        <View style={!onCheck ? styles.circle : styles.checkedCircle}>
          <Text style={!onCheck ? styles.number : styles.checkedNumber}>1</Text>
        </View>
      )}
      {number === "2" && (
        <View style={!onCheck ? styles.circle : styles.checkedCircle}>
          <Text style={!onCheck ? styles.number : styles.checkedNumber}>2</Text>
        </View>
      )}
      {
        <Text style={!onCheck ? styles.title : styles.checkedTitle}>
          {title}
        </Text>
      }
    </Pressable>
  );
}

export default CheckButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.point,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 4,
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: "row",
  },
  checkedContainer: {
    backgroundColor: Colors.grey3,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 4,
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: "row",
  },
  title: {
    fontFamily: "nnsq-bold",
    color: Colors.darkblue,
    fontSize: 30,
  },
  checkedTitle: {
    fontFamily: "nnsq-bold",
    color: "#adadad",
    fontSize: 30,
  },
  number: {
    fontFamily: "nnsq-bold",
    color: Colors.point,
    fontSize: 30,
    textAlign: "center",
  },
  checkedNumber: {
    fontFamily: "nnsq-bold",
    color: Colors.grey3,
    fontSize: 30,
    textAlign: "center",
  },
  circle: {
    backgroundColor: Colors.darkblue,
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
    justifyContent: "center",
  },
  checkedCircle: {
    backgroundColor: "#adadad",
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
    justifyContent: "center",
  },
});
