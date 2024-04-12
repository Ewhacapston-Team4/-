import { View, StyleSheet, Text } from "react-native";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import GoalItem from "./GoalItem";

import { PILLS } from "../../datas/pills-list";
import { DailyContext } from "../../store/context/daily-context";

function Goals({ time }) {
  const checkedMedsCtx = useContext(DailyContext);

  let pillsToDisplay;
  if (time === "아침") {
    pillsToDisplay = PILLS.filter((pill) => pill.morning);
  } else if (time === "점심") {
    pillsToDisplay = PILLS.filter((pill) => pill.lunch);
  } else {
    pillsToDisplay = PILLS.filter((pill) => pill.evening);
  }

  const allChecked = pillsToDisplay.every((pill) =>
    checkedMedsCtx.ids.includes(
      `0${time === "아침" ? "1" : time === "점심" ? "2" : "3"}${pill.id}`
    )
  );

  const content = (
    <View>
      {pillsToDisplay.map((pill, index) => (
        <GoalItem
          key={index}
          medId={`0${time === "아침" ? "1" : time === "점심" ? "2" : "3"}${pill.id}`}
          content={pill.summary}
        />
      ))}
    </View>
  );

  let icon;

  if (allChecked) {
    icon = <Ionicons name="checkmark-circle" color={Colors.point} size={40} />;
  } else {
    icon = <Ionicons name="ellipse" color={Colors.grey1} size={40} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {icon}
        <Text style={styles.time}>{time}</Text>
        {content}
      </View>
    </View>
  );
}

export default Goals;

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", alignItems: "center" },
  labelContainer: {
    alignItems: "center",
    paddingBottom: 10,
  },
  time: {
    fontFamily: "nnsq-bold",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
