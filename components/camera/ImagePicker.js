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
import CheckButton from "../../ui/CheckButton";

function ImagePicker({ onImagePicked, onModePicked }) {
  const [pickedImage, setPickedImage] = useState();
  const [firstImage, setFirstImage] = useState();
  const [secondImage, setSecondImage] = useState();
  const [galleryPersmissionInformation, galleryRequestPermission] =
    useMediaLibraryPermissions();
  const [cameraPersmissionInformation, requestPermission] =
    useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState("");
  const [firstImageChecked, setFirstImageChecked] = useState(false);
  const [secondImageChecked, setSecondImageChecked] = useState(false);

  const { getPhotoType } = usePills();
  const photoType = getPhotoType();

  const ref = useRef();

  // useEffect(() => {
  //   if (firstImage && photoType === "add") {
  //     setModalVisible(true);
  //     if (ref.current) {
  //       ref.current
  //         .capture()
  //         .then((uri) => {
  //           if (uri) {
  //             console.log("Captured URI:", uri);
  //             setPickedImage(uri);
  //           } else {
  //             console.log("URI is undefined or null");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error capturing image:", error);
  //         });
  //     }
  //   }
  //   if (secondImage && photoType === "search") {
  //     setModalVisible(true);
  //     if (ref.current) {
  //       ref.current
  //         .capture()
  //         .then((uri) => {
  //           if (uri) {
  //             console.log("Captured URI:", uri);
  //             setPickedImage(uri);
  //           } else {
  //             console.log("URI is undefined or null");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error capturing image:", error);
  //         });
  //     }
  //   }
  // }, [firstImage, secondImage]);

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

  useEffect(() => {
    setFirstImageChecked(!!firstImage);
  }, [firstImage]);

  useEffect(() => {
    setSecondImageChecked(!!secondImage);
  }, [secondImage]);

  const onImageLoad = useCallback(() => {
    ref.current.capture().then((uri) => {
      setPickedImage(uri);
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
  }

  const finishEditing = () => {
    // ref.current.capture().then((uri) => {
    //   setPickedImage(uri);
    // });
    console.log("click!");
    console.log(pickedImage);
    onImagePicked(pickedImage);
    //onImagePicked(firstImage);
    setModalVisible(false);
  };

  let mode_title;
  if (mode === "camera") {
    mode_title = "촬영";
  } else {
    mode_title = "선택";
  }

  return (
    <View>
      {!mode && (
        <BasicButton
          title="사진 찍기"
          onPress={() => {
            setMode("camera");
            onModePicked("camera");
            takeImageHandler();
          }}
        />
      )}
      {!mode && (
        <BasicButton
          title="갤러리에서 고르기"
          onPress={() => {
            setMode("gallery");
            onModePicked("gallery");
            takeImageHandler("gallery");
          }}
        />
      )}
      {mode && (
        <CheckButton
          title={
            photoType === "add"
              ? `${mode_title} ${firstImage ? "완료" : ""}`
              : `${mode_title}  ${firstImage ? "완료" : ""}`
          }
          number={photoType === "search" && "1"}
          onCheck={firstImageChecked}
        />
      )}
      {mode && photoType === "search" && (
        <CheckButton
          title={`${mode_title}  ${secondImage ? "완료" : ""}`}
          number={"2"}
          onCheck={secondImageChecked}
        />
      )}
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
                <ViewShot
                  ref={ref}
                  options={{
                    fileName: "newImage",
                    format: "jpg",
                    quality: 1.0,
                  }}
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
                      {/* <RenderBoundingBoxes
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
                      /> */}
                      <Image
                        style={{ width: "100%", height: 280 }}
                        source={{ uri: firstImage }}
                        onError={(error) =>
                          console.log("이미지 로드 오류: ", error)
                        }
                      />
                    </>
                  )}
                </ViewShot>
              </View>
              <BasicButton
                onPress={finishEditing}
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
