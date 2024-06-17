import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";

import * as Speech from "expo-speech";

import Colors from "../constants/Colors";
import TTS from "../components/TTS";

import Daily from "../components/daily/Daily";
import { DailyContext } from "../store/context/daily-context";

function Schedule() {
  const [selected, setSelected] = useState("2024-06-07");
  const [modalVisible, setModalVisible] = useState(true);

  const dailyContext = useContext(DailyContext);

  LocaleConfig.locales["kr"] = {
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: [
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
      "일요일",
    ],
    dayNamesShort: ["월", "화", "수", "목", "금", "토", "일"],
    today: "오늘",
  };
  LocaleConfig.defaultLocale = "kr";

  const handleModalClose = () => {
    setModalVisible(false);
  };

  function buttonHandler() {
    console.log("Button Clicked!");
    // TTS.speak("Button Clicked!");
  }

  // const morning = { key: "morning", color: "red", selectedDotColor: "blue" };
  // const afternoon = {
  //   key: "afternoon",
  //   color: "blue",
  //   selectedDotColor: "blue",
  // };
  // const dinner = { key: "dinner", color: "green" };

  const renderDots = () => {
    const markedDates = {};

    Object.keys(dailyContext.datas).forEach((date) => {
      const dots = [];
      const medicationInfo = dailyContext.datas[date];

      if (medicationInfo.morning) {
        dots.push({ key: "morning", color: "#95ded9" });
      }
      if (medicationInfo.afternoon) {
        dots.push({ key: "afternoon", color: "#3ac7bd" });
      }
      if (medicationInfo.evening) {
        dots.push({ key: "evening", color: "#1db5aa" });
      }
      if (dots.length > 0) {
        markedDates[date] = { dots };
      }
    });

    //console.log(markedDates);
    return markedDates;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Calendar
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: Colors.darkblue,
            textSectionTitleDisabledColor: Colors.darkblue,
            //selectedDayBackgroundColor: Colors.main,
            //selectedDayTextColor: "#ffffff",
            todayTextColor: Colors.point,
            dayTextColor: "#2d4150",
            //textDisabledColor: Colors.darkblue,
            //dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            dotStyle: {
              width: 10,
              height: 5,
            },
            arrowColor: "orange",
            disabledArrowColor: "#d9e1e8",
            monthTextColor: Colors.main,
            //indicatorColor: "blue",
            textDayFontFamily: "nnsq-bold",
            textMonthFontFamily: "nnsq-bold",
            textDayHeaderFontFamily: "nnsq-bold",
            textDayFontWeight: "300",
            textMonthFontWeight: "300",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 20,
            textMonthFontSize: 25,
            textDayHeaderFontSize: 20,
            weekVerticalMargin: 10,
          }}
          markingType={"multi-dot"}
          markedDates={{
            ...renderDots(),
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: Colors.main,
            },
          }}
          style={styles.calendar}
          onDayPress={
            (day) => {
              setSelected(day.dateString);
              //console.log(day);
            }
            // setModalVisible(true);
          }
        />
        <View style={styles.dailyContainer}>
          <Daily type={"schedule"} title={selected} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    backgroundColor: Colors.bg1,
    alignContent: "center",
    paddingTop: 80,
  },
  calendar: {
    paddingVertical: 30,
    elevation: 4,
  },
  dailyContainer: {
    width: "112%",
  },
});
