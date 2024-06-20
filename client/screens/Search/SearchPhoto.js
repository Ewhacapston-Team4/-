import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import Colors from "../../constants/Colors";

import Title1 from "../../ui/Title1";
import ImagePicker from "../../components/camera/ImagePicker";

function SearchPhoto({ route, navigation }) {
  const [pickedMedImage, setPickedMedImage] = useState(null);
  const [mode, setMode] = useState("");

  function onImagePicked(imageUrl) {
    setPickedMedImage(imageUrl);
  }
  function onModePicked(mode) {
    setMode(mode);
  }
  let title;

  if (!mode) {
    title = "사진으로 찾기";
  } else if (mode === "camera") {
    title = "사진을 촬영해주세요";
  } else {
    title = "사진을 골라주세요";
  }

  useEffect(() => {
    if (pickedMedImage) {
      navigation.navigate("ImagePreview", {
        imageUrl: pickedMedImage,
        type: "search",
      });
    }
  }, [pickedMedImage, navigation]);

  return (
    <View style={styles.container}>
      <Title1>{title}</Title1>
      <ImagePicker onImagePicked={onImagePicked} onModePicked={onModePicked} />
    </View>
  );
}

export default SearchPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg2,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
});
