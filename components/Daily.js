import { View, StyleSheet } from "react-native";

import Box from "../ui/Box";
import Goals from "./Goals";

function Daily() {
  return (
    <View style={styles.container}>
      <Box title="오늘 드실 약">
        <View style={styles.goalsContainer}>
          <Goals time={"아침"} />
          <Goals time={"점심"} />
          <Goals time={"저녁"} />
        </View>
      </Box>
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
