import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect, Fragment } from "react";

import Box from "../../ui/Box";

import Colors from "../../constants/Colors";
import ResultItem from "../../components/ResultItem";

let date;

function AddResult({ route }) {
  const [date, setDate] = useState("");
  const [medList, setMedList] = useState([]);

  useEffect(() => {
    if (route.params) {
      const { date: incomingDate, meds: incomingMeds } = route.params;
      //console.log(incomingDate, incomingMeds);
      setDate(incomingDate);
      setMedList(incomingMeds);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
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
    </View>
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
});
