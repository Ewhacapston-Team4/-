import { View, StyleSheet } from "react-native";

import { PILLS } from "../datas/pills-list";

import Box from "../ui/Box";
import PillItem from "./PillItem";

function PillList() {
  return (
    <Box title="드시고 계신 약" style={styles.rootContainer}>
      <View style={styles.itemContainer}>
        {PILLS.map((item) => (
          <PillItem
            key={item.id}
            imageUrl={item.imageUrl}
            pillName={item.name}
            summary={item.summary}
          />
        ))}
      </View>
    </Box>
  );
}

export default PillList;

const styles = StyleSheet.create({
  rootContainer: {
    width: "90%",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row", // 항목들을 가로 방향으로 나열
    flexWrap: "wrap", // 여러 줄로 나누어 표시
    justifyContent: "flex-start",
  },
});
