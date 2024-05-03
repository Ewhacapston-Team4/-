import {
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  Alert,
  View,
  Platform,
} from "react-native";
import { useState, useEffect, Fragment } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import Box from "../../ui/Box";

import Colors from "../../constants/Colors";
import ResultItem from "../../components/ResultItem";
import BasicButton from "../../ui/BasicButton";
import Title from "../../ui/Title";
import TimePicker from "../../components/TimePicker";

let date;
let temp_morning;
let temp_lunch;
let temp_dinner;

function AddResult({ route }) {
  const [date, setDate] = useState("");
  const [medList, setMedList] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [timeList, setTimeList] = useState([]);

  const openModal = () => {
    setModalVisible(true);
  };

  // useEffect(() => {
  //   async function setupPushNotifications() {
  //     const { status } = await Notifications.getPermissionsAsync();
  //     let finalStatus = status;

  //     if (finalStatus !== "granted") {
  //       const { status } = Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       Alert.alert("권한 필요", "push 알림 권한이 필요합니다.");
  //       return;
  //     }

  //     const pushTokenData = await Notifications.getExpoPushTokenAsync({
  //       projectId: Constants.expoConfig.extra.eas.projectId,
  //     });
  //     console.log(pushTokenData);

  //     if (Platform.OS === "android") {
  //       Notifications.setNotificationChannelAsync("default", {
  //         name: "default",
  //         importance: Notifications.AndroidImportance.DEFAULT,
  //       });
  //     }
  //   }

  //   setupPushNotifications();
  // }, []);
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (TimePicker) => {
        console.log("알림 수신");
        console.log(TimePicker);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("알림 응답 수신");
        console.log(response);
      }
    );
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  function alarmHandler() {
    setModalVisible(false);

    setTimeList({
      morning: temp_morning,
      lunch: temp_lunch,
      dinner: temp_dinner,
    });
    console.log(timeList);

    let [morning_hour, morning_min] = timeList.dinner.split(":");
    let [lunch_hour, lunch_min] = timeList.dinner.split(":");
    let [dinner_hour, dinner_min] = timeList.dinner.split(":");
    Notifications.scheduleNotificationAsync({
      content: {
        title: "김약사",
        body: "약 드실 시간입니다!",
        data: { userName: "Max" },
      },
      trigger: {
        ...Platform.select({
          android: { hour: morning_hour, minute: morning_min, type: "daily" },
          ios: {
            dateComponents: { hour: morning_hour, minute: morning_min },
            repeats: true,
            type: "calendar",
          },
        }),
      },
    });
    Notifications.scheduleNotificationAsync({
      content: {
        title: "김약사",
        body: "약 드실 시간입니다!",
        data: { userName: "Max" },
      },
      trigger: {
        ...Platform.select({
          android: { hour: lunch_hour, minute: lunch_min, type: "daily" },
          ios: {
            dateComponents: { hour: lunch_hour, minute: lunch_min },
            repeats: true,
            type: "calendar",
          },
        }),
      },
    });
    Notifications.scheduleNotificationAsync({
      content: {
        title: "김약사",
        body: "약 드실 시간입니다!",
        data: { userName: "Max" },
      },
      trigger: {
        ...Platform.select({
          android: { hour: dinner_hour, minute: dinner_min, type: "daily" },
          ios: {
            dateComponents: { hour: dinner_hour, minute: dinner_min },
            repeats: true,
            type: "calendar",
          },
        }),
      },
    });
  }

  useEffect(() => {
    if (route.params) {
      const { date: incomingDate, meds: incomingMeds } = route.params;
      //console.log(incomingDate, incomingMeds);
      setDate(incomingDate);
      setMedList(incomingMeds);
      saveTimeList(medList);
      temp_morning = timeList.morning;
      temp_lunch = timeList.lunch;
      temp_dinner = timeList.dinner;
    }
  }, [route.params]);

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[AAgndpME8HN5tB61SkmhK4]",
        title: "Test - sent from a device!",
        body: "This is a test!",
      }),
    });
  }

  function saveTimeList(inputList) {
    inputList.forEach((item) => {
      const info = item.info;

      if (!info) return;

      const pattern = /(\d+)정\s*씩\s*(\d+)회/g;
      const match = pattern.exec(info);

      if (!match) return;

      const frequency = match[2];
      //console.log(info);
      //console.log(frequency);

      if (frequency === "1") {
        setTimeList({ morning: "09:00" });
      } else if (frequency === "2") {
        setTimeList({ morning: "09:00", dinner: "18:00" });
      } else if (frequency === "3") {
        setTimeList({ morning: "09:00", lunch: "12:00", dinner: "18:00" });
      }
    });

    //console.log(timeList);
  }
  const handleTimeChange = (newTime, type) => {
    if (type === "morning") {
      temp_morning = newTime;
    } else if (type === "lunch") {
      temp_lunch = newTime;
    } else {
      temp_dinner = newTime;
    }
  };
  return (
    <ScrollView style={styles.container}>
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
        onPress={() => setModalVisible(true)}
      ></BasicButton>
      <BasicButton
        title="Send Push TimePicker"
        onPress={sendPushNotificationHandler}
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
            {temp_morning !== undefined && (
              <TimePicker
                time={temp_morning}
                onTimeChange={(newTime) => handleTimeChange(newTime, "morning")}
              />
            )}
            {temp_lunch !== undefined && (
              <TimePicker
                time={temp_lunch}
                onTimeChange={(newTime) => handleTimeChange(newTime, "lunch")}
              />
            )}
            {temp_dinner !== undefined && (
              <TimePicker
                time={temp_dinner}
                onTimeChange={(newTime) => handleTimeChange(newTime, "dinner")}
              />
            )}
            <View style={styles.row}>
              <BasicButton
                style={styles.flex_1}
                title="네"
                onPress={alarmHandler}
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
    </ScrollView>
  );
}

export default AddResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg2,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  text: {
    fontFamily: "nnsq-bold",
    fontSize: 22,
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
});
