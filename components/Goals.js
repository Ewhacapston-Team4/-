import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import BrownBox from "../ui/BrownBox";

function Goals() {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Ionicons name="ellipse" color={Colors.grey1} size={31} />
        <Text style={styles.time}>아침</Text>
      </View>
      <View style={styles.boxContainer}>
        <BrownBox>혈압약</BrownBox>
        <BrownBox>당뇨약</BrownBox>
        <BrownBox>관절약</BrownBox>
      </View>
    </View>
  );
}

export default Goals;

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", alignItems: "center" },
  labelContainer: {
    alignItems: "center",
    paddingBottom: 15,
  },
  time: { fontFamily: "nnsq-regular", fontSize: 20 },
});
