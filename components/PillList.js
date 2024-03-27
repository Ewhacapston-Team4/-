import { View, StyleSheet, FlatList } from "react-native";

import { PILLS } from "../datas/pills-list";

import Box from "../ui/Box";
import PillItem from "./PillItem";

function renderPillItem(itemData) {
  return (
    <PillItem
      pillName={itemData.item.name}
      imageUrl={itemData.item.imageUrl}
      summary={itemData.item.summary}
    />
  );
}
function PillList() {
  return (
    <View style={styles.container}>
      <Box title="드시고 계신 약">
        <FlatList
          data={PILLS}
          keyExtractor={(item) => item.id}
          renderItem={renderPillItem}
          numColumns={3}
        />
      </Box>
    </View>
  );
}

export default PillList;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    justifyContent: "center",
  },
});
