import { Pressable, StyleSheet } from "react-native";
import { useContext } from "react";

import Colors from "../../constants/Colors";
import BrownBox from "../../ui/BrownBox";

import { DailyContext } from "../../store/context/daily-context";
import { PILLS } from "../../datas/pills-list";

function GoalItem({ content, medId }) {
  const checkedMedsCtx = useContext(DailyContext);

  const medIsChecked = checkedMedsCtx.ids.includes(medId);

  function medPressHandler() {
    if (medIsChecked) {
      checkedMedsCtx.unCheckMed(medId);
    } else {
      checkedMedsCtx.checkMed(medId);
    }
  }
  return (
    <Pressable onPress={medPressHandler}>
      <BrownBox type={medIsChecked ? "checked" : "unchecked"}>
        {content}
      </BrownBox>
    </Pressable>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey3,
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
  text: { fontFamily: "nnsq-regular", fontSize: 20 },
});
