import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const BUTTON_WIDTH = 50;
const VIEW_WIDTH = 50 * 3;

function TimePicker({ time, onTimeChange }) {
  const scrollX = React.useRef(new Animated.Value(1)).current;

  const [hour, setHour] = useState(() => {
    const [hourString] = time.split(":");
    return hourString;
  });

  const [min, setMin] = useState(() => {
    const [, minuteString] = time.split(":");
    return minuteString;
  });

  function minusHandler() {
    if (min === "00") {
      setMin("50");
      if (hour === "00") {
        setHour("23");
      } else {
        setHour((parseInt(hour) <= 9 ? "0" : "") + parseInt(hour - 1));
      }
    } else if (min < 60 && min > 10) {
      setMin(parseInt(min) - 10);
    } else {
      setMin("00");
    }
    onTimeChange(`${hour}:${min}`);
  }

  function addHandler() {
    if (min === "50") {
      setMin("00");
      if (hour === "23") {
        setHour("00");
      } else {
        setHour((parseInt(hour) < 9 ? "0" : "") + (parseInt(hour) + 1));
      }
    } else if (min < 50 && min >= 0) {
      setMin(parseInt(min) + 10);
    } else {
      setMin("00");
      setHour((parseInt(hour) < 9 ? "0" : "") + (parseInt(hour) + 1));
    }
    onTimeChange(`${hour}:${min}`);
  }
  return (
    <View style={styles.row}>
      {/* <Pressable onPress={minusHandler}>
        <Ionicons name="remove-circle" size={30} />
      </Pressable> */}
      <View style={styles.timeContainer}>
        <Text style={styles.text}>
          {hour} : {min}
        </Text>
      </View>
      {/* <Pressable onPress={addHandler}>
        <Ionicons name="add-circle" size={30} />
      </Pressable> */}
    </View>
  );
}

export default TimePicker;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    fontFamily: "nnsq-bold",
    fontSize: 22,
  },
  timeContainer: {
    alignItems: "center",
    width: "75%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 5,
    elevation: 4,
    marginVertical: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
