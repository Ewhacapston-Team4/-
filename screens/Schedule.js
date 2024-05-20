import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";

import * as Speech from "expo-speech";

import Colors from "../constants/Colors";
import TTS from "../components/TTS";

import Daily from "../components/daily/Daily";
import { useDailyData } from "../store/context/daily-context";

function Schedule() {
  const [selected, setSelected] = useState("2024-05-14");
  const [modalVisible, setModalVisible] = useState(true);

  const { dailyData } = useDailyData();

  const handleModalClose = () => {
    setModalVisible(false);
  };

  function buttonHandler() {
    console.log("Button Clicked!");
    // TTS.speak("Button Clicked!");
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Calendar
          style={styles.calendar}
          theme={{}}
          onDayPress={(day) => {
            setSelected(day.dateString);
            setModalVisible(true);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: Colors.main,
            },
          }}
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
    backgroundColor: Colors.bg1,
    paddingTop: 90,
  },
  calendar: {
    padding: 40,
    elevation: 4,
  },
  dailyContainer: {
    alignItems: "center",
  },
});
