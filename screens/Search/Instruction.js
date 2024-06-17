import { StyleSheet, View } from "react-native";

import Colors from "../../constants/Colors";

function Instruction() {
  return (
    <View style={styles.container}>
      <View></View>
    </View>
  );
}

export default Instruction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg2,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
});
