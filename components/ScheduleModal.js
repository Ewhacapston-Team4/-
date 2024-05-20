import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";

import Colors from "../constants/Colors";
import Daily from "./daily/Daily";
import PillList from "./PillList";

function ScheduleModal({ visible, animationType, transparent, date, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          {/* <View style={styles.modalContent}> */}
          <Text style={styles.modalTitle}>{date}</Text>
          <Daily />
          {/* </View> */}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default ScheduleModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // 화면 하단 정렬
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명한 배경색
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 70,
    borderRadius: 10,
    alignItems: "center",
  },
  dailyContainer: {
    flexDirection: "row",
  },
});
