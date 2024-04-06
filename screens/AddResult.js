import { View, StyleSheet } from "react-native";
import { useState, useEffect, Fragment } from "react";

import Box from "../ui/Box";

import Colors from "../constants/Colors";
import ResultItem from "../components/ResultItem";

let date;

function AddResult({ route }) {
  const [date, setDate] = useState("");
  const [medList, setMedList] = useState([]);

  useEffect(() => {
    if (route.params) {
      const { date: incomingDate, meds: incomingMeds } = route.params;
      setDate(incomingDate);
      setMedList(incomingMeds);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Box title={"인식 결과"}>
        {date && <ResultItem title={"약 타신 날"} value={date} />}
        {medList.map((med, index) => (
          <Fragment key={index}>
            {med.name && (
              <ResultItem
                title={`약 0${index + 1}`}
                value={med.name}
                info={med.info}
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
    backgroundColor: Colors.bg1,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
});
