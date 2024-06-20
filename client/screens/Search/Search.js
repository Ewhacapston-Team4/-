import {
  StyleSheet,
  View,
  Modal,
  Text,
  Pressable,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";

import Colors from "../../constants/Colors";
import { usePills } from "../../store/context/pills-context";

import Title1 from "../../ui/Title1";
import SelectButton from "../../components/SelectButton";
import SearchBox from "../../components/SearchBox";
import BasicButton from "../../ui/BasicButton";
import TTS from "../../components/TTS";

function Search({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [seletedIcon, setSeletedIcon] = useState(null);
  const [pressedIcon, setPressedIcon] = useState(null);

  const { setPillType, setPhotoType } = usePills();

  const openModal = () => {
    setModalVisible(true);
    TTS.speak("어떤 형태의 약인가요?");
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const searchPhotoHandler = () => {
    openModal();
  };

  const navigateToScreen = (screenName) => {
    return () => {
      navigation.navigate(screenName);
      setPhotoType("search");
    };
  };

  const handlePress = (type) => {
    setPressedIcon(type);
    setSeletedIcon(type);

    switch (type) {
      case "pill1":
        sound = "원형";
        break;
      case "pill2":
        sound = "타원형";
        break;
      case "pill3":
        sound = "정방형";
        break;
      case "pill4":
        sound = "오각형 육각형 팔각형";
        break;
      case "pill5":
        sound = "삼각형 사각형 마름모";
        break;
      case "pill6":
        sound = "기타";
        break;
      default:
        sound = "PHO";
        break;
    }
    TTS.speak(sound);
  };
  const handlePressOut = () => {
    setPressedIcon(null);
  };

  return (
    <View style={styles.rootContainer}>
      <Title1 style={styles.title}>알약을 찾아보세요</Title1>
      <View style={styles.container}>
        <SelectButton
          title="사진 찍어서 찾기"
          imageKey="icon2"
          onPress={searchPhotoHandler}
        />
        <View style={styles.gap}></View>
        <SearchBox
          placeholder={"약 이름을 검색해보세요."}
          onPress={navigateToScreen("SearchName")}
          editable={false}
        ></SearchBox>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>어떤 형태의 약인가요?</Text>
              <View style={styles.iconsContainer}>
                <Pressable
                  style={
                    seletedIcon === "pill1"
                      ? styles.seleted
                      : styles.iconContainer
                  }
                  onPressIn={() => {
                    handlePress("pill1");
                  }}
                  onPressOut={handlePressOut}
                >
                  {pressedIcon === "pill1" ? (
                    <Text style={styles.smallText}>원형</Text>
                  ) : (
                    <Image
                      style={styles.image}
                      source={require(`../../assets/images/pill1.png`)}
                    />
                  )}
                </Pressable>
                <Pressable
                  style={
                    seletedIcon === "pill2"
                      ? styles.seleted
                      : styles.iconContainer
                  }
                  onPressIn={() => {
                    handlePress("pill2");
                  }}
                  onPressOut={handlePressOut}
                >
                  {pressedIcon === "pill2" ? (
                    <Text style={styles.smallText}>타원형</Text>
                  ) : (
                    <Image
                      style={styles.image}
                      source={require(`../../assets/images/pill2.png`)}
                    />
                  )}
                </Pressable>
                <Pressable
                  style={
                    seletedIcon === "pill3"
                      ? styles.seleted
                      : styles.iconContainer
                  }
                  onPressIn={() => {
                    handlePress("pill3");
                  }}
                  onPressOut={handlePressOut}
                >
                  {pressedIcon === "pill3" ? (
                    <Text style={styles.smallText}>정방형</Text>
                  ) : (
                    <Image
                      style={styles.image}
                      source={require(`../../assets/images/pill3.png`)}
                    />
                  )}
                </Pressable>
                <Pressable
                  style={
                    seletedIcon === "pill4"
                      ? styles.seleted
                      : styles.iconContainer
                  }
                  onPressIn={() => {
                    handlePress("pill4");
                  }}
                  onPressOut={handlePressOut}
                >
                  {pressedIcon === "pill4" ? (
                    <>
                      <Text style={styles.smallText}>오각형</Text>
                      <Text style={styles.smallText}>육각형</Text>
                      <Text style={styles.smallText}>팔각형</Text>
                    </>
                  ) : (
                    <Image
                      style={styles.image}
                      source={require(`../../assets/images/pill4.png`)}
                    />
                  )}
                </Pressable>
                <Pressable
                  style={
                    seletedIcon === "pill5"
                      ? styles.seleted
                      : styles.iconContainer
                  }
                  onPressIn={() => {
                    handlePress("pill5");
                  }}
                  onPressOut={handlePressOut}
                >
                  {pressedIcon === "pill5" ? (
                    <>
                      <Text style={styles.smallText}>삼각형</Text>
                      <Text style={styles.smallText}>사각형</Text>
                      <Text style={styles.smallText}>마름모</Text>
                    </>
                  ) : (
                    <Image
                      style={styles.image}
                      source={require(`../../assets/images/pill5.png`)}
                    />
                  )}
                </Pressable>
                <Pressable
                  style={
                    seletedIcon === "pill6"
                      ? styles.seleted
                      : styles.iconContainer
                  }
                  onPressIn={() => {
                    handlePress("pill6");
                  }}
                  onPressOut={handlePressOut}
                >
                  {pressedIcon === "pill6" ? (
                    <Text style={styles.smallText}>기타</Text>
                  ) : (
                    <Image
                      style={styles.image}
                      source={require(`../../assets/images/pill6.png`)}
                    />
                  )}
                </Pressable>
              </View>
              <BasicButton
                style={styles.position}
                onPress={() => {
                  setPillType(seletedIcon);
                  closeModal();
                  setPhotoType("search");
                  navigation.navigate("SearchPhoto");
                }}
                title={"선택"}
              ></BasicButton>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.bg2,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  title: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
  },
  container: { flex: 1, justifyContent: "center" },
  gap: {
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // 화면 하단 정렬
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명한 배경색
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    height: "60%",
  },
  modalTitle: {
    fontFamily: "nnsq-bold",
    fontSize: 25,
    paddingRight: 15,
    minWidth: 120,
    paddingTop: 15,
    paddingBottom: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    height: "70%",
    paddingBottom: 10,
  },
  seleted: {
    width: "30%", // 필요에 따라 조정
    height: "48%", // 필요에 따라 조정
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.point,
    backgroundColor: "rgba(118, 230, 245, 0.3)",
    justifyContent: "center", // 이미지가 컨테이너 중앙에 위치하게 설정
    alignItems: "center", // 이미지가 컨테이너 중앙에 위치하게 설정
    paddingHorizontal: 10,
    margin: 2,
  },
  iconContainer: {
    width: "30%", // 필요에 따라 조정
    height: "48%", // 필요에 따라 조정
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grey4,
    backgroundColor: "rgba(118, 230, 245, 0.1)",
    justifyContent: "center", // 이미지가 컨테이너 중앙에 위치하게 설정
    alignItems: "center", // 이미지가 컨테이너 중앙에 위치하게 설정
    paddingHorizontal: 10,
    margin: 2,
  },
  smallText: {
    textAlign: "center", // 가운데 정렬
    fontFamily: "noto-sans-bold",
    fontSize: 20,
    margin: -13,
  },
  image: {
    width: "100%",
    height: "100%", // 부모 너비와 동일하게 설정
    resizeMode: "contain",
  },
});
