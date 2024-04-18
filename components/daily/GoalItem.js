import { Pressable, StyleSheet } from "react-native";
import { useContext } from "react";

import BrownBox from "../../ui/BrownBox";

import { DailyContext } from "../../store/context/daily-context";

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
    <Pressable style={styles.container} onPress={medPressHandler}>
      <BrownBox type={medIsChecked ? "checked" : "unchecked"}>
        {content}
      </BrownBox>
    </Pressable>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  container: {},
  text: { fontFamily: "nnsq-regular", fontSize: 20 },
});
