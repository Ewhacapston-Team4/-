import { Pressable, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";

import BrownBox from "../../ui/BrownBox";

import { DailyContext } from "../../store/context/daily-context";

function GoalItem({ content, medId, checked, date }) {
  const [medIsChecked, setMedIsChecked] = useState(checked);

  useEffect(() => {
    setMedIsChecked(checked);
  }, [date]);
  // console.log(date, checked);
  const checkedMedsCtx = useContext(DailyContext);

  // useEffect(() => {
  //   setMedIsChecked(checkedMedsCtx.checkMedsValue(date, medId));
  // }, []);
  // //console.log(medIsChecked);

  // useEffect(() => {
  //   if (checked === true) {
  //     console.log(medIsChecked);
  //     checkedMedsCtx.addMedToDailyData(date, medId);
  //   } else if (checked === false) {
  //     checkedMedsCtx.removeMedFromDailyData(date, medId);
  //   }
  // }, [medIsChecked]);

  function medPressHandler() {
    if (medIsChecked) {
      setMedIsChecked(false);
      checkedMedsCtx.removeMedFromDailyData(date, medId);
    } else {
      setMedIsChecked(true);
      checkedMedsCtx.addMedToDailyData(date, medId);
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
