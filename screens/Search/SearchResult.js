import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import Title1 from "../../ui/Title1";
import Box from "../../ui/Box";
import InfoBox from "../../ui/InfoBox";

import { searchInfos, getUsers } from "../../util/http";

function SearchResult({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const {
    name: name,
    id: id,
    imageUrl: imageUrl,
    infos: infos,
    prohibited: prohibited,
  } = route.params;

  return (
    <View style={styles.container}>
      <Title1>검색 결과</Title1>
      <View style={styles.contentContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Box style={styles.Box} type={"notitle"}>
          <View style={styles.textContainer}>
            <Text style={styles.result}>{name}</Text>
          </View>
          <View style={styles.infoContainer}>
            {infos.length !== 0 ? (
              <InfoBox title={"약품 정보"}>
                {infos.map((item, index) => (
                  <Text key={index} style={styles.textStyle}>
                    ・ {item}
                  </Text>
                ))}
              </InfoBox>
            ) : (
              <></>
            )}
            <InfoBox title={"병용 금기 약물"}>
              {prohibited.length !== 0 ? (
                <ScrollView>
                  <View style={[styles.divider, styles.soft]} />
                  {prohibited.map((item, index) => (
                    <>
                      <Pressable onPress={() => openModal(item)}>
                        <Text key={index} style={styles.textStyle}>
                          0{index + 1} {item.name}
                        </Text>
                        <View style={styles.divider} />
                      </Pressable>
                    </>
                  ))}
                </ScrollView>
              ) : (
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="checkmark-circle"
                    color={Colors.main}
                    size={60}
                  />
                  <Text style={styles.text}>병용 금기 약물이 없습니다!</Text>
                </View>
              )}
            </InfoBox>
          </View>
        </Box>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.row}>
              <Text style={styles.text}>{selectedItem?.name}</Text>
              <Pressable
                style={styles.round}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.exit}>닫기</Text>
              </Pressable>
            </View>
            <Text style={[styles.text, styles.black]}>
              {selectedItem?.summary}
            </Text>
            <View style={styles.center}>
              <Image
                source={selectedItem?.imageUrl}
                style={styles.image_small}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg2,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  contentContainer: {
    alignItems: "center",
    //justifyContent: "center",
  },
  image: { width: "100%", height: 180, alignContent: "center" },
  image_small: {
    width: "50%",
    height: 100,
  },
  textContainer: {
    overflow: "hidden",
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  result: { fontFamily: "noto-sans-medium", fontSize: 22, paddingVertical: 10 },
  Box: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 15,
    marginBottom: 200,
    paddingTop: 0,
    //maxHeight: "62%"
    flex: 1,
  },
  infoContainer: {
    // borderWidth: 2,
    // borderRadius: 8,
    // borderColor: Colors.grey1,
    // backgroundColor: "#CAD6D566",
    // overflow: "hidden",
    // textAlign: "center",
    // textAlignVertical: "center",
    // alignContent: "center",
    // alignItems: "center",
    // marginTop: 5,
    maxHeight: "72%",
  },
  prohiContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.grey1,
    backgroundColor: "#CAD6D566",
    overflow: "hidden",
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  text: {
    fontFamily: "noto-sans-medium",
    fontSize: 20,
    color: Colors.main,
    paddingTop: 15,
  },
  textStyle: {
    fontFamily: "noto-sans-medium",
    fontSize: 18,
    paddingLeft: 20,
    marginVertical: 5,
    textAlign: "left",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 20,
  },
  divider: {
    height: 1, // 세로선의 두께
    backgroundColor: Colors.grey4, // 세로선의 색상
    marginHorizontal: 15,
    alignContent: "center",
    marginVertical: 5,
  },
  soft: {
    backgroundColor: "#A8B0BFaa",
  },
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
  exit: {
    fontSize: 18,
    fontFamily: "noto-sans-medium",
    color: Colors.darkblue,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  black: {
    color: "black",
  },
});
