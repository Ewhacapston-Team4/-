import { Button, View, StyleSheet, Alert } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
  launchImageLibraryAsync,
  PermissionStatus,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useState, useEffect } from "react";

function ImagePicker({ onImagePicked }) {
  const [pickedImage, setPickedImage] = useState();
  const [galleryPersmissionInformation, galleryRequestPermission] =
    useMediaLibraryPermissions();
  const [cameraPersmissionInformation, requestPermission] =
    useCameraPermissions();

  useEffect(() => {
    if (pickedImage) {
    }
  }, []);

  async function verifyPermissions() {
    if (cameraPersmissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPersmissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "사진 촬영 불가",
        "설정에서 카메라 사용 권한을 설정해주세요."
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler(mode) {
    let image;
    if (mode === "gallery") {
      await requestMediaLibraryPermissionsAsync();
      image = await launchImageLibraryAsync({
        aspect: [16, 9],
        quality: 1,
      });
    } else {
      const hasPermssion = await verifyPermissions();

      if (!hasPermssion) {
        return;
      }
      image = await launchCameraAsync({ aspect: [16, 21], quality: 1 });
    }

    //console.log(image.assets[0].uri);
    setPickedImage(image.assets[0].uri);
    onImagePicked(image.assets[0].uri);
  }

  return (
    <View>
      <Button title="사진 찍기" onPress={takeImageHandler} />
      <Button
        title="갤러리에서 고르기"
        onPress={() => takeImageHandler("gallery")}
      />
    </View>
  );
}

export default ImagePicker;
