import { Button, View, StyleSheet } from "react-native";
import { launchCameraAsync, useCameraPermissions } from "expo-image-picker";

function ImagePicker() {
  useCameraPermissions();

  async function takeImageHandler() {
    const image = await launchCameraAsync({ aspect: [1, 1], quality: 0.5 });
    console.log(image);
  }

  return (
    <View>
      <Button title="사진 찍기" onPress={takeImageHandler} />
      <Button title="갤러리에서 고르기" />
    </View>
  );
}

export default ImagePicker;
