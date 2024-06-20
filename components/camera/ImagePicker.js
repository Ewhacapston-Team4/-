import {
  Button,
  View,
  StyleSheet,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
  launchImageLibraryAsync,
  PermissionStatus,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useState, useEffect } from "react";

import { usePills } from "../../store/context/pills-context";

import BasicButton from "../../ui/BasicButton";
import { searchImage } from "../../util/http";

function ImagePicker({ onImagePicked }) {
  const [pickedImage, setPickedImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [galleryPersmissionInformation, galleryRequestPermission] =
    useMediaLibraryPermissions();
  const [cameraPersmissionInformation, requestPermission] =
    useCameraPermissions();

  const { getPhotoType } = usePills();
  const photoType = getPhotoType();

  useEffect(() => {
    if (pickedImage) {
      setModalVisible(true);
    }
  }, [pickedImage]);

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
    //onImagePicked(image.assets[0].uri);
  }
  const finishEditing = () => {
    console.log("click!");
    console.log(pickedImage);
    onImagePicked(pickedImage);
    setModalVisible(false);
  };

  return (
    <View>
      <BasicButton title="사진 찍기" onPress={takeImageHandler} />
      <BasicButton
        title="갤러리에서 고르기"
        onPress={() => takeImageHandler("gallery")}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View
              style={
                photoType === "search"
                  ? styles.modalContent
                  : styles.modalContent_new
              }
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  style={
                    photoType === "search"
                      ? styles.searchImage
                      : styles.addImage
                  }
                  source={{ uri: pickedImage }}
                  onError={(error) => console.log("이미지 로드 오류: ", error)}
                />
              </View>
              <BasicButton
                onPress={finishEditing}
                style={{ marginTop: 30 }}
                title="선택 완료"
              />
              <BasicButton
                title="다시 선택"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  searchImage: { width: "100%", height: 180, alignContent: "center" },
  addImage: { width: "100%", height: 280, alignContent: "center" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // 화면 하단 정렬
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명한 배경색
  },
  modalContent: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
    height: "50%",
  },
  modalContent_new: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
    height: "63%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
