import { createContext, useState, useContext } from "react";

const DailyContext = createContext();

export const DailyContextProvider = ({ children }) => {
  const [dailyData, setDailyData] = useState({
    "2024-04-01": { morning: true, afternoon: false, evening: true },
    "2024-04-02": { morning: false, afternoon: true, evening: false },
    "2024-04-03": { morning: true, afternoon: false, evening: true },
    "2024-04-04": { morning: true, afternoon: true, evening: false },
    "2024-04-05": { morning: false, afternoon: false, evening: true },
    "2024-04-06": { morning: true, afternoon: true, evening: false },
    "2024-04-07": { morning: false, afternoon: true, evening: true },
    "2024-04-08": { morning: true, afternoon: false, evening: false },
    "2024-04-09": { morning: false, afternoon: false, evening: true },
    "2024-04-10": { morning: true, afternoon: true, evening: true },
    "2024-04-11": { morning: true, afternoon: false, evening: false },
    "2024-04-12": { morning: false, afternoon: true, evening: false },
    "2024-04-13": { morning: true, afternoon: false, evening: true },
    "2024-04-14": { morning: false, afternoon: true, evening: false },
    "2024-04-15": { morning: true, afternoon: true, evening: true },
    "2024-04-16": { morning: true, afternoon: false, evening: false },
    "2024-04-17": { morning: false, afternoon: false, evening: true },
    "2024-04-18": { morning: true, afternoon: true, evening: false },
    "2024-04-19": { morning: false, afternoon: true, evening: true },
    "2024-04-20": { morning: true, afternoon: false, evening: false },
    "2024-04-21": { morning: false, afternoon: false, evening: true },
    "2024-04-22": { morning: true, afternoon: true, evening: false },
    "2024-04-23": { morning: false, afternoon: true, evening: true },
    "2024-04-24": { morning: true, afternoon: false, evening: false },
    "2024-04-25": { morning: false, afternoon: false, evening: true },
    "2024-04-26": { morning: true, afternoon: true, evening: false },
    "2024-04-27": { morning: false, afternoon: true, evening: true },
    "2024-04-28": { morning: true, afternoon: false, evening: false },
    "2024-04-29": { morning: false, afternoon: false, evening: true },
    "2024-04-30": { morning: true, afternoon: true, evening: true },
    "2024-05-01": { morning: true, afternoon: false, evening: false },
    "2024-05-02": { morning: false, afternoon: true, evening: false },
    "2024-05-03": { morning: true, afternoon: false, evening: true },
    "2024-05-04": { morning: false, afternoon: true, evening: false },
    "2024-05-05": { morning: true, afternoon: true, evening: true },
    "2024-05-06": { morning: true, afternoon: false, evening: false },
    "2024-05-07": { morning: false, afternoon: false, evening: true },
    "2024-05-08": { morning: true, afternoon: true, evening: false },
    "2024-05-09": { morning: false, afternoon: true, evening: true },
    "2024-05-10": { morning: true, afternoon: false, evening: false },
    "2024-05-11": { morning: false, afternoon: false, evening: true },
    "2024-05-12": { morning: true, afternoon: true, evening: false },
    "2024-05-13": { morning: false, afternoon: true, evening: true },
    "2024-05-14": { morning: true, afternoon: false, evening: false },
    "2024-05-15": { morning: false, afternoon: false, evening: true },
    "2024-05-16": { morning: true, afternoon: true, evening: false },
    "2024-05-17": { morning: false, afternoon: true, evening: true },
    "2024-05-18": { morning: true, afternoon: false, evening: false },
    "2024-05-19": { morning: false, afternoon: false, evening: true },
    "2024-05-20": { morning: true, afternoon: true, evening: true },
    "2024-05-21": { morning: true, afternoon: false, evening: false },
    "2024-05-22": { morning: false, afternoon: true, evening: false },
    "2024-05-23": { morning: false, afternoon: true, evening: true },
    "2024-05-24": { morning: true, afternoon: false, evening: false },
    "2024-05-25": { morning: false, afternoon: false, evening: true },
    "2024-05-26": { morning: true, afternoon: true, evening: false },
    "2024-05-27": { morning: false, afternoon: true, evening: true },
    "2024-05-28": { morning: true, afternoon: false, evening: false },
  });

  return (
    <DailyContext.Provider value={{ dailyData, setDailyData }}>
      {children}
    </DailyContext.Provider>
  );
};

export const useDailyData = () => useContext(DailyContext);

// export const DailyContext = createContext({
//   ids: [],
//   checkMed: (id) => {},
//   unCheckMed: (id) => {},
// });

// function DailyContextProvider({ children }) {
//   const [checkedMeds, setCheckedMeds] = useState([]);

//   function checkMed(id) {
//     setCheckedMeds((currentIds) => [...currentIds, id]);
//   }

//   function unCheckMed(id) {
//     setCheckedMeds((currentIds) =>
//       currentIds.filter((medIds) => medIds !== id)
//     );
//   }

//   const value = {
//     ids: checkedMeds,
//     checkMed: checkMed,
//     unCheckMed: unCheckMed,
//   };

//   return (
//     <DailyContext.Provider value={value}>{children}</DailyContext.Provider>
//   );
// }

// export default DailyContextProvider;
