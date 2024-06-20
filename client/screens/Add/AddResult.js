import {
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  Alert,
  View,
  Platform,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, Fragment } from "react";
import * as Notifications from "expo-notifications";
import { usePills } from "../../store/context/pills-context";

import TTS from "../../components/TTS";

import Box from "../../ui/Box";

import Colors from "../../constants/Colors";
import ResultItem from "../../components/ResultItem";
import BasicButton from "../../ui/BasicButton";
import Title from "../../ui/Title";
import TimePicker from "../../components/TimePicker";
import Pill from "../../models/pill";

function AddResult({ route, navigation }) {
  const [date, setDate] = useState("");
  const [medList, setMedList] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [timeList, setTimeList] = useState([]);
  const [temp_morning, setTempMorning] = useState("");
  const [temp_lunch, setTempLunch] = useState("");
  const [temp_dinner, setTempDinner] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { addPills } = usePills();

  // useEffect(() => {
  //   TTS.speak(
  //     "김혜자님, 피디정 이미리그램, 알레락정오미리그램, 가스모틴정오미리그램, 삼아리도멕스크림을 처방 받으셨네요. 복용 알림을 등록하시려면 하단의 버튼을 눌러주세요."
  //   );
  // }, [medList]);

  const handleImagePress = () => {
    setImageModalVisible(true);
  };

  const handleModalClose = () => {
    setImageModalVisible(false);
  };

  function saveTimeList(inputList) {
    inputList.forEach((item) => {
      const info = item.info;

      if (!info) return;

      const pattern = /(\d+)정\s*씩\s*(\d+)회/g;
      const match = pattern.exec(info);

      if (!match) return;

      const frequency = match[2];
      console.log(info);
      console.log(frequency);

      if (frequency === "1") {
        console.log("1");
        setTempMorning("09:00");
      } else if (frequency === "2") {
        console.log("2");
        setTempMorning("09:00");
        setTempDinner("18:00");
      } else if (frequency === "3") {
        console.log("3");
        setTempMorning("09:00");
        setTempLunch("12:00");
        setTempDinner("18:00");
      }
    });

    console.log("save time list ing:", temp_lunch, temp_morning, temp_dinner);
  }

  const handleAddPills = () => {
    setModalVisible(false);
    const Pills = [
      new Pill(
        "201906902",
        "피디정2mg",
        "호르몬제",
        require("../../assets/images/image01.png"),
        true,
        true,
        true
      ),
      new Pill(
        "201705486",
        "가스모틴정5mg",
        "진경제",
        require("../../assets/images/image02.png"),
        true,
        false,
        true
      ),
      new Pill(
        "04938272",
        "알레락정5mg",
        "알러지약",
        require("../../assets/images/image03.png"),
        true,
        true,
        true
      ),
      new Pill(
        "04977272",
        "보나링에이정",
        "진토제",
        require("../../assets/images/a.png"),
        true,
        true,
        true
      ),
      new Pill(
        "04000072",
        "모티리톤정",
        "소화제",
        require("../../assets/images/b.png"),
        true,
        true,
        true
      ),
      new Pill(
        "049772972",
        "기넥신에프정80mg",
        "순환개선제",
        require("../../assets/images/c.png"),
        true,
        false,
        true
      ),
      new Pill(
        "04911172",
        "티프민정",
        "진경제",
        require("../../assets/images/d.png"),
        true,
        true,
        true
      ),
      new Pill(
        "11111272",
        "크로부틴정",
        "진경제",
        require("../../assets/images/e.png"),
        true,
        true,
        true
      ),
      new Pill(
        "04222272",
        "레비스정",
        "위장약",
        require("../../assets/images/f.png"),
        true,
        true,
        true
      ),
      new Pill(
        "03334472",
        "시메코판연질캡슐",
        "위장약",
        require("../../assets/images/g.png"),
        true,
        true,
        true
      ),
      new Pill(
        "88888272",
        "휴텍스파모티딘정20",
        "진토제",
        require("../../assets/images/h.png"),
        true,
        false,
        true
      ),
    ];

    const newPills = medList
      .map((med) => Pills.find((pill) => pill.name === med.name))
      .filter(Boolean);

    addPills(newPills);
    navigation.navigate("Home");
  };

  useEffect(() => {
    if (medList.length !== 0) {
      console.log("medList:", medList);
      saveTimeList(medList);
      console.log(
        "after save times list:",
        temp_morning,
        temp_lunch,
        temp_dinner
      );
    }
  }, [medList]);

  const handleTimeChange = (newTime, type) => {
    console.log(newTime);
    if (type === "morning") {
      setTempMorning(newTime);
    } else if (type === "lunch") {
      setTempLunch(newTime);
    } else {
      setTempDinner(newTime);
    }
    console.log(
      "after handle time change:",
      temp_morning,
      temp_lunch,
      temp_dinner
    );
  };

  useEffect(() => {
    if (route.params) {
      const {
        date: incomingDate,
        meds: incomingMeds,
        imageUrl: incomingUrl,
      } = route.params;
      setDate(incomingDate);
      setMedList(incomingMeds);
      setImageUrl(incomingUrl);
    }
  }, [route.params]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleImagePress}>
        {imageUrl ? (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>

      <Box title={"인식 결과"}>
        {date && <ResultItem title={"약 타신 날"} value={date} type={"date"} />}
        <Text style={styles.text}>타신 약</Text>
        {medList.map((med, index) => (
          <Fragment key={index}>
            {med.name && (
              <ResultItem
                title={`0${index + 1}`}
                value={med.name}
                info={med.info}
                type={"med"}
              />
            )}
          </Fragment>
        ))}
      </Box>
      <BasicButton
        title="알람 등록하기"
        style={{ marginBottom: "40%" }}
        onPress={() => setModalVisible(true)}
      ></BasicButton>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Title>알람을 등록하시겠습니까?</Title>
            <TimePicker
              time={"09:00"}
              onTimeChange={(newTime) => handleTimeChange(newTime, "morning")}
            />
            <TimePicker
              time={"12:00"}
              onTimeChange={(newTime) => handleTimeChange(newTime, "lunch")}
            />
            <TimePicker
              time={"18:00"}
              onTimeChange={(newTime) => handleTimeChange(newTime, "dinner")}
            />
            <View style={styles.row}>
              <BasicButton
                style={styles.flex_1}
                title="네"
                onPress={handleAddPills}
              ></BasicButton>
              <View style={{ paddingHorizontal: 5 }}></View>
              <BasicButton
                style={styles.flex_1}
                title="아니요"
                onPress={() => {
                  setModalVisible(false);
                }}
                type={"no"}
              ></BasicButton>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={imageModalVisible}
        transparent={true}
        onRequestClose={handleModalClose}
      >
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={styles.imageModalBackground}>
            <View style={styles.imageModalContent}>
              <TouchableOpacity
                onPress={handleModalClose}
                style={styles.closeButton}
              >
                <Text>X</Text>
              </TouchableOpacity>
              {imageUrl ? (
                <Image
                  style={[styles.modalImage, { height: 300 }]}
                  source={{ uri: imageUrl }}
                />
              ) : (
                <ActivityIndicator />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
}

export default AddResult;

const styles = StyleSheet.create({
  image: { width: "100%", height: 250, alignContent: "center" },
  container: {
    flex: 1,
    backgroundColor: Colors.bg2,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "20%",
  },
  text: {
    fontFamily: "nnsq-bold",
    fontSize: 25,
    paddingRight: 15,
    minWidth: 120,
    paddingVertical: 15,
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
    paddingTop: 20,
  },
  flex_1: {
    flex: 1,
  },
  imageModalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageModalContent: {
    backgroundColor: "white",
    alignItems: "center",
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalImage: {},
  top: {
    zIndex: 9999,
  },
  rectangleA: {
    position: "absolute",
    left: 35,
    top: 15,
    width: 45,
    height: 15,
    backgroundColor: Colors.main, // Red with opacity
  },
  rectangleB: {
    position: "absolute",
    left: 145,
    top: 20,
    width: 60,
    height: 20,
    backgroundColor: Colors.main, // Blue with opacity
  },
  paddingBottom: {
    paddingBottom: 50,
  },
});
