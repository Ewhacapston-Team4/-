import { StyleSheet, View, Image } from "react-native";

import Colors from "../constants/Colors";
import Title1 from "../ui/Title1";
import SelectButton from "../components/SelectButton";

function Search() {
  return (
    <View style={styles.container}>
      <Title1>알약을 찾아보세요</Title1>
      <SelectButton
        title="사진 찍어서 찾기"
        imageUrl="../assets/images/image2.png"
      />
      <SelectButton
        title="이름으로 찾기"
        imageUrl="../assets/images/image1.png"
      />
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  image: {},
});
