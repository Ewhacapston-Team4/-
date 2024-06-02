//*****************수정 전 ************************

// import { View, StyleSheet } from "react-native";

// import { PILLS } from "../datas/pills-list";

// import Box from "../ui/Box";
// import PillItem from "./PillItem";

// function PillList() {
//   return (
//     <View style={styles.rootContainer}>
//       <Box title="드시고 계신 약">
//         <View style={styles.itemContainer}>
//           {PILLS.map((item) => (
//             <PillItem
//               key={item.id}
//               imageUrl={item.imageUrl}
//               pillName={item.name}
//               summary={item.summary}
//             />
//           ))}
//         </View>
//       </Box>
//     </View>
//   );
// }

// export default PillList;

// const styles = StyleSheet.create({
//   rootContainer: {
//     width: "90%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   itemContainer: {
//     flexDirection: "row", // 항목들을 가로 방향으로 나열
//     flexWrap: "wrap", // 여러 줄로 나누어 표시
//     justifyContent: "flex-start",
//     shadowColor: "#000000",
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.37,
//     shadowRadius: 2.5,
//   },
//   new: {
//     paddingHorizontal: 15,
//   },
// });

// screens/HomeScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { usePills } from "../store/context/pills-context";
import Box from "../ui/Box";
import PillItem from "../components/PillItem";

function PillList() {
  const { pills } = usePills();

  return (
    <View style={styles.rootContainer}>
      <Box title="드시고 계신 약" type={"home"}>
        <View style={styles.itemContainer}>
          {pills.map((item) => (
            <PillItem
              key={item.id}
              imageUrl={item.imageUrl}
              pillName={item.name}
              summary={item.summary}
            />
          ))}
        </View>
      </Box>
    </View>
  );
}

export default PillList;

const styles = StyleSheet.create({
  rootContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.37,
    shadowRadius: 2.5,
  },
  new: {
    paddingHorizontal: 15,
  },
});
