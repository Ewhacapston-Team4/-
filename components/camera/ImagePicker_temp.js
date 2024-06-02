import { Button, View, StyleSheet, Alert, Modal } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
  launchImageLibraryAsync,
  PermissionStatus,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import BasicButton from "../../ui/BasicButton";

function ImagePicker({ onImagePicked, navigation }) {
  const [pickedImage, setPickedImage] = useState();
  const [galleryPersmissionInformation, galleryRequestPermission] =
    useMediaLibraryPermissions();
  const [cameraPersmissionInformation, requestPermission] =
    useCameraPermissions();

  // 여기 주석 처리
  // useEffect(() => {
  //   if (pickedImage) {
  //     console.log(pickedImage);
  //     navigation.navigate("ImageEdit", {
  //       imageUrl: pickedImage,
  //     });
  //   }
  // }, [pickedImage, navigation]);

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
    onImagePicked(image.assets[0].uri); //여기 주석 처리
  }

  async function openModal() {
    setModalVisible(true);
  }

  return (
    <View>
      <BasicButton title="사진 찍기" onPress={takeImageHandler} />
      <BasicButton
        title="갤러리에서 고르기"
        onPress={() => takeImageHandler("gallery")}
      />
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // 화면 하단 정렬
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명한 배경색
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 70,
    borderRadius: 10,
  },
});
