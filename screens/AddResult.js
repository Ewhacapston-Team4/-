import { View, StyleSheet } from "react-native";

import Box from "../ui/Box";

import Colors from "../constants/Colors";
import ResultItem from "../components/ResultItem";

function AddResult() {
  return (
    <View style={styles.container}>
      <Box title={"인식 결과"}>
        <ResultItem title={"바보"} value={"똥개"} />
      </Box>
    </View>
  );
}

export default AddResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
});
