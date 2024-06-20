import { View, StyleSheet, Text } from "react-native";
import { useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import GoalItem from "./GoalItem";

import { PILLS } from "../../datas/pills-list";
import { DailyContext } from "../../store/context/daily-context";
import { usePills } from "../../store/context/pills-context";
import { all } from "axios";

function Goals({ time, date }) {
  const checkedMedsCtx = useContext(DailyContext);
  const { pills } = usePills();

  let pillsToDisplay;
  if (time === "아침") {
    pillsToDisplay = pills.filter((pill) => pill.morning);
    console.log("m", pillsToDisplay);
  } else if (time === "점심") {
    pillsToDisplay = pills.filter((pill) => pill.lunch);
    //console.log("l", pillsToDisplay);
  } else {
    pillsToDisplay = pills.filter((pill) => pill.evening);
    //console.log("d", pillsToDisplay);
  }

  let allChecked;

  useEffect(() => {
    allChecked = pillsToDisplay.every((pill) => {
      checkedMedsCtx.checkMedsValue(
        date,
        `0${time === "아침" ? "1" : time === "점심" ? "2" : "3"}${pill.id}`
      );
    });
    console.log("allChecked", time, date, allChecked);
  }, [checkedMedsCtx.datas[date].meds]);

  const content = (
    <View>
      {pillsToDisplay.map((pill, index) => (
        <GoalItem
          key={index}
          medId={`0${time === "아침" ? "1" : time === "점심" ? "2" : "3"}${pill.id}`}
          content={pill.summary}
          checked={checkedMedsCtx.checkValue(date, time)}
          date={date}
        />
      ))}
    </View>
  );

  useEffect(() => {
    //console.log("before", allChecked, checkedMedsCtx.checkValue(date, time));
    if (allChecked || checkedMedsCtx.checkValue(date, time)) {
      checkedMedsCtx.toggleTime(date, time, true);
    } else {
      checkedMedsCtx.toggleTime(date, time, false);
    }
    //console.log("after", allChecked, checkedMedsCtx.checkValue(date, time));
  }, [allChecked, checkedMedsCtx.checkValue(date, time)]);
  let icon;

  if (allChecked || checkedMedsCtx.checkValue(date, time)) {
    icon = <Ionicons name="checkmark-circle" color={Colors.point} size={40} />;
    //checkedMedsCtx.toggleTime(date, time, true);
  } else {
    icon = <Ionicons name="ellipse" color={Colors.grey1} size={40} />;
    //checkedMedsCtx.toggleTime(date, time, false);
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
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelContainer: {
    alignItems: "center",
    //paddingBottom: 10,
  },
  time: {
    fontFamily: "nnsq-bold",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

//***************수정 전 *****************

// import { View, StyleSheet, Text } from "react-native";
// import { useContext } from "react";
// import { Ionicons } from "@expo/vector-icons";

// import Colors from "../../constants/Colors";
// import GoalItem from "./GoalItem";

// import { PILLS } from "../../datas/pills-list";
// import { DailyContext } from "../../store/context/daily-context";
// import { PillsContext } from "../../datas/pills-list";

// function Goals({ time }) {
//   const checkedMedsCtx = useContext(DailyContext);
//   //const pillsCtx = useContext(PillsContext);

//   let pillsToDisplay;
//   if (time === "아침") {
//     pillsToDisplay = PILLS.filter((pill) => pill.morning);
//   } else if (time === "점심") {
//     pillsToDisplay = PILLS.filter((pill) => pill.lunch);
//   } else {
//     pillsToDisplay = PILLS.filter((pill) => pill.evening);
//   }

//   const allChecked = pillsToDisplay.every((pill) =>
//     checkedMedsCtx.ids.includes(
//       `0${time === "아침" ? "1" : time === "점심" ? "2" : "3"}${pill.id}`
//     )
//   );

//   const content = (
//     <View>
//       {pillsToDisplay.map((pill, index) => (
//         <GoalItem
//           key={index}
//           medId={`0${time === "아침" ? "1" : time === "점심" ? "2" : "3"}${pill.id}`}
//           content={pill.summary}
//         />
//       ))}
//     </View>
//   );

//   let icon;

//   if (allChecked) {
//     icon = <Ionicons name="checkmark-circle" color={Colors.point} size={40} />;
//   } else {
//     icon = <Ionicons name="ellipse" color={Colors.grey1} size={40} />;
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.labelContainer}>
//         {icon}
//         <Text style={styles.time}>{time}</Text>
//         {content}
//       </View>
//     </View>
//   );
// }

// export default Goals;

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   labelContainer: {
//     alignItems: "center",
//     //paddingBottom: 10,
//   },
//   time: {
//     fontFamily: "nnsq-bold",
//     fontSize: 20,
//     paddingTop: 10,
//     paddingBottom: 10,
//   },
// });
