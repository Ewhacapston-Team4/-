import { View, StyleSheet, Button } from "react-native";
import { useState, useEffect } from "react";

import Title1 from "../ui/Title1";
import Colors from "../constants/Colors";
import ImagePicker from "../components/camera/ImagePicker";

function SearchPhoto({ navigation }) {
  const [pickedMedImage, setPickedMedImage] = useState(null);

  function onImagePicked(imageUrl) {
    setPickedMedImage(imageUrl);
  }

  useEffect(() => {
    if (pickedMedImage) {
      // navigation.navigate 함수에서 매개변수 전달을 객체 형태로 수정
      navigation.navigate("ImagePreview", {
        imageUrl: pickedMedImage,
        type: "search",
      });
    }
  }, [pickedMedImage, navigation]);

  return (
    <View style={styles.container}>
      <Title1>찍어서 찾기</Title1>
      <ImagePicker onImagePicked={onImagePicked} />
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
