import { StyleSheet, View } from "react-native";

import Colors from "../constants/Colors";
import Title from "../ui/Title";
import SelectButton from "../components/SelectButton";

function Search() {
  return (
    <View style={styles.container}>
      <Title>알약을 찾아보세요</Title>
      <SelectButton />
      <SelectButton />
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
    paddingTop: 75,
    paddingHorizontal: 20,
  },
});
