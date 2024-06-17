import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import Title1 from "../../ui/Title1";
import Colors from "../../constants/Colors";
import ImagePicker from "../../components/camera/ImagePicker";

function AddPhoto({ navigation }) {
  const [pickedBagImage, setPickedBagImage] = useState("");
  const [mode, setMode] = useState("");

  function onImagePicked(imageUrl) {
    //console.log(imageUrl);
    setPickedBagImage(imageUrl);
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
    if (pickedBagImage) {
      // navigation.navigate 함수에서 매개변수 전달을 객체 형태로 수정
      navigation.navigate("ImagePreview", {
        imageUrl: pickedBagImage,
        type: "add",
      });
    }
  }, [pickedBagImage, navigation]);

  return (
    <View style={styles.container}>
      <Title1>사진으로 등록</Title1>
      <View style={styles.gap}></View>
      <ImagePicker
        onImagePicked={onImagePicked}
        navigation={navigation}
        onModePicked={onModePicked}
      />
    </View>
  );
}

export default AddPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg2,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  gap: {
    paddingVertical: 15,
  },
});
