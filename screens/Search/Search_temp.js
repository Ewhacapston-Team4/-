import { StyleSheet, View, Modal, Pressable, Text, Image } from "react-native";
import { useEffect, useState } from "react";

import Colors from "../../constants/Colors";
import Title1 from "../../ui/Title1";
import SearchBox from "../../components/SearchBox";
import SelectButton from "../../components/SelectButton";
import BasicButton from "../../ui/BasicButton";

function Search({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [seletedIcon, setSeletedIcon] = useState(null);
  const [pressedIcon, setPressedIcon] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const selectHandler = () => {
    //closeModal();
    navigateToScreen("SearchPhoto");
  };

  const searchPhotoHandler = () => {
    openModal();
  };

  const navigateToScreen = (screenName, params) => {
    return () => {
      navigation.navigate(screenName, params);
    };
  };
  // const navigateToScreenNew = (screenName, type) => {
  //   return () => {
  //     navigation.navigate(screenName, type);
  //   };
  // };

  const handlePress = (type) => {
    setPressedIcon(type);
    setSeletedIcon(type);
    //console.log(type);
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
                closeModal();
                navigation.navigate("SearchPhoto", { pill: seletedIcon });
              }}
              title={"선택"}
            ></BasicButton>
          </View>
        </View>
      </Modal>
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
  container: { flex: 1, justifyContent: "center" },
  gap: {
    paddingVertical: 10,
  },
  title: {
    position: "absolute", // 절대 위치로 설정
    top: 100, // 상단으로부터 20의 간격
    left: 20, // 왼쪽으로부터 20의 간격
    right: 20, // 오른쪽으로부터 20의 간격, 컨테이너 내에서 가운데 정렬을 위해
  },
  modalContainer: {
    flex: 1,
    //   //height: "300px",
    justifyContent: "flex-end", // 화면 하단 정렬
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명한 배경색
  },
  modalContent: {
    // //height: "300px",
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
  image: {
    // // 고정 높이 및 비율 조정
    // height: "30%", // 전체 높이의 60%
    width: "100%",
    height: "100%", // 부모 너비와 동일하게 설정
    resizeMode: "contain",
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
    //paddingBottom: 10,
  },
  fullWidth: {
    // width: "100%",
    // padding: 10,
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
    //paddingTop: 13,
    paddingHorizontal: 10,
    margin: 2,
  },
});
