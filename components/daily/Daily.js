import { View, StyleSheet } from "react-native";

import Box from "../../ui/Box";
import Goals from "./Goals";
import Colors from "../../constants/Colors";

function Daily({ type, date }) {
  let newTitle = "";
  if (type === "home") {
    newTitle = "오늘 드실 약";
  } else if (type === "schedule") {
    newTitle = date;
  }
  return (
    <View style={styles.container}>
      {type === "home" ? (
        <Box title={newTitle} type={type}>
          <View style={styles.goalsContainer}>
            <Goals time={"아침"} date={date} />
            <View style={styles.divider} />
            <Goals time={"점심"} date={date} />
            <View style={styles.divider} />
            <Goals time={"저녁"} date={date} />
          </View>
        </Box>
      ) : (
        <Box title={newTitle} type={type}>
          <View style={styles.goalsContainer}>
            <Goals time={"아침"} date={date} />
            <View style={styles.divider_gap} />
            <Goals time={"점심"} date={date} />
            <View style={styles.divider_gap} />
            <Goals time={"저녁"} date={date} />
          </View>
        </Box>
      )}
    </View>
  );
}

export default Daily;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    justifyContent: "center",
  },
  goalsContainer: {
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  divider: {
    width: 1, // 세로선의 두께
    marginHorizontal: 2,
    backgroundColor: Colors.grey3, // 세로선의 색상
    height: "95%", // 부모 컨테이너에 맞춰 세로선의 높이를 조절
  },
  divider_gap: {
    width: 1, // 세로선의 두께
    marginHorizontal: 12,
    backgroundColor: Colors.grey3, // 세로선의 색상
    height: "95%", // 부모 컨테이너에 맞춰 세로선의 높이를 조절
  },
});
