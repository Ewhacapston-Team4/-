import { View, StyleSheet, Button } from "react-native";

import Title1 from "../ui/Title1";
import Colors from "../constants/Colors";
import ImagePicker from "../components/camera/ImagePicker";

function SearchPhoto() {
  return (
    <View style={styles.container}>
      <Title1>찍어서 찾기</Title1>
      <ImagePicker />
    </View>
  );
}

export default SearchPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
});
