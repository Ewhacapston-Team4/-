// import { Button, View, StyleSheet, Alert, Modal } from "react-native";
// import {
//   launchCameraAsync,
//   useCameraPermissions,
//   useMediaLibraryPermissions,
//   launchImageLibraryAsync,
//   PermissionStatus,
//   requestMediaLibraryPermissionsAsync,
// } from "expo-image-picker";
// import { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";

// import BasicButton from "../../ui/BasicButton";

// function ImagePicker({ onImagePicked, navigation }) {
//   const [pickedImage, setPickedImage] = useState();
//   const [galleryPersmissionInformation, galleryRequestPermission] =
//     useMediaLibraryPermissions();
//   const [cameraPersmissionInformation, requestPermission] =
//     useCameraPermissions();

//   // 여기 주석 처리
//   // useEffect(() => {
//   //   if (pickedImage) {
//   //     console.log(pickedImage);
//   //     navigation.navigate("ImageEdit", {
//   //       imageUrl: pickedImage,
//   //     });
//   //   }
//   // }, [pickedImage, navigation]);

//   async function verifyPermissions() {
//     if (cameraPersmissionInformation.status === PermissionStatus.UNDETERMINED) {
//       const permissionResponse = await requestPermission();

//       return permissionResponse.granted;
//     }

//     if (cameraPersmissionInformation.status === PermissionStatus.DENIED) {
//       Alert.alert(
//         "사진 촬영 불가",
//         "설정에서 카메라 사용 권한을 설정해주세요."
//       );
//       return false;
//     }
//     return true;
//   }

//   async function takeImageHandler(mode) {
//     let image;
//     if (mode === "gallery") {
//       await requestMediaLibraryPermissionsAsync();
//       image = await launchImageLibraryAsync({
//         aspect: [16, 9],
//         quality: 1,
//       });
//     } else {
//       const hasPermssion = await verifyPermissions();

//       if (!hasPermssion) {
//         return;
//       }
//       image = await launchCameraAsync({ aspect: [16, 21], quality: 1 });
//     }

//     //console.log(image.assets[0].uri);
//     setPickedImage(image.assets[0].uri);
//     onImagePicked(image.assets[0].uri); //여기 주석 처리
//   }

//   async function openModal() {
//     setModalVisible(true);
//   }

//   return (
//     <View>
//       <BasicButton title="사진 찍기" onPress={takeImageHandler} />
//       <BasicButton
//         title="갤러리에서 고르기"
//         onPress={() => takeImageHandler("gallery")}
//       />
//     </View>
//   );
// }

// export default ImagePicker;

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end", // 화면 하단 정렬
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명한 배경색
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     paddingBottom: 70,
//     borderRadius: 10,
//   },
// });

import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Alert,
  Modal,
  StyleSheet,
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
import { StaticCollage } from "react-native-images-collage";
import ViewShot from "react-native-view-shot";

import { usePills } from "../../store/context/pills-context";

import BasicButton from "../../ui/BasicButton";
import RenderBoundingBoxes from "../../ui/RenderBoundingBoxes";

function ImagePicker({ onImagePicked, navigation }) {
  const [pickedImage, setPickedImage] = useState();
  const [firstImage, setFirstImage] = useState();
  const [secondImage, setSecondImage] = useState();
  const [galleryPersmissionInformation, galleryRequestPermission] =
    useMediaLibraryPermissions();
  const [cameraPersmissionInformation, requestPermission] =
    useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);

  const { getPhotoType } = usePills();

  const photoType = getPhotoType();
  //console.log(photoType);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const ref = useRef();

  useEffect(() => {
    if (firstImage && photoType === "add") {
      setModalVisible(true);
      if (ref.current) {
        ref.current.capture().then((uri) => {
          setPickedImage(uri);
        });
      }
    }
    if (secondImage && photoType === "search") {
      setModalVisible(true);
      if (ref.current) {
        ref.current.capture().then((uri) => {
          setPickedImage(uri);
        });
      }
    }
  }, [firstImage, secondImage]);

  const onImageLoad = useCallback(() => {
    ref.current.capture().then((uri) => {
      console.log("do something with ", uri);
    });
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

  let image;
  async function takeImageHandler(mode) {
    let fstImage;
    let sndImage;
    if (mode === "gallery") {
      await requestMediaLibraryPermissionsAsync();
      fstImage = await launchImageLibraryAsync({
        aspect: [1, 1],
        quality: 1,
      });

      if (photoType === "search") {
        sndImage = await launchImageLibraryAsync({
          aspect: [1, 1],
          quality: 1,
        });
      }
    } else {
      const hasPermssion = await verifyPermissions();

      if (!hasPermssion) {
        return;
      }
      fstImage = await launchCameraAsync({ aspect: [1, 1], quality: 1 });
      if (photoType !== "add") {
        sndImage = await launchCameraAsync({ aspect: [1, 1], quality: 1 });
      }
    }
    setFirstImage(fstImage.assets[0].uri);
    if (photoType === "search") {
      setSecondImage(sndImage.assets[0].uri);
    }
    //setPickedImage(image.assets[0].uri);
    //onImagePicked(image.assets[0].uri); //여기 주석 처리
  }

  function finishEditing() {
    console.log("pickedImage:", pickedImage);
    onImagePicked(pickedImage);
    setModalVisible(false);
  }

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
              {/* <Image style={styles.image} source={{ uri: firstImage }} />
              <Image style={styles.image} source={{ uri: secondImage }} /> */}
              {/* <Image style={styles.image} source={{ uri: pickedImage }} /> */}
              <View style={{ alignItems: "center" }}>
                <ViewShot
                  ref={ref}
                  options={{
                    fileName: "newImage",
                    format: "jpg",
                    quality: 1.0,
                  }}
                  captureMode="mount"
                >
                  {photoType === "search" ? (
                    <StaticCollage
                      width={360}
                      height={180}
                      images={[firstImage, secondImage]}
                      matrix={[1, 1]}
                      containerStyle={{ borderWidth: 0 }}
                      seperatorStyle={{
                        borderWidth: 0,
                      }}
                    />
                  ) : (
                    <>
                      <RenderBoundingBoxes
                        verticesArray={[
                          [
                            { x: -150, y: 20 },
                            { x: -100, y: 35 },
                          ],
                          [
                            { x: -37, y: 30 },
                            { x: 40, y: 55 },
                          ],
                        ]}
                      />
                      <Image
                        style={{ width: "100%", height: 280 }}
                        source={{ uri: firstImage }}
                        onError={(error) =>
                          console.log("이미지 로드 오류: ", error)
                        }
                        onLoad={onImageLoad}
                      />
                    </>
                  )}
                </ViewShot>
              </View>
              <BasicButton
                // onPress={finishEditing()}
                style={{ marginTop: 30 }}
                title="선택 완료"
              />
              <BasicButton title="다시 촬영" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  image: { width: "100%", height: 180, alignContent: "center" },
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
