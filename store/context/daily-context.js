import { createContext, useState } from "react";

export const DailyContext = createContext({
  ids: [],
  checkMed: (id) => {},
  unCheckMed: (id) => {},
});

function DailyContextProvider({ children }) {
  const [checkedMeds, setCheckedMeds] = useState([]);

  const [dailyData, setDailyData] = useState({
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
    "2024-05-29": { morning: false, afternoon: true, evening: true },
    "2024-05-30": { morning: true, afternoon: false, evening: false },
    "2024-05-31": { morning: false, afternoon: false, evening: true },
    "2024-06-01": { morning: true, afternoon: true, evening: true },
    "2024-06-02": { morning: false, afternoon: true, evening: true },
    "2024-06-03": { morning: true, afternoon: true, evening: true },
    "2024-06-04": { morning: true, afternoon: true, evening: true },
    "2024-06-05": { morning: true, afternoon: true, evening: true },
    "2024-06-06": { morning: true, afternoon: false, evening: true },
    "2024-06-07": { morning: true, afternoon: false, evening: true },
  });

  function checkMed(id) {
    setCheckedMeds((currentIds) => [...currentIds, id]);
  }

  function unCheckMed(id) {
    setCheckedMeds((currentIds) =>
      currentIds.filter((medIds) => medIds !== id)
    );
  }

  const value = {
    ids: checkedMeds,
    checkMed: checkMed,
    unCheckMed: unCheckMed,
    datas: dailyData,
    setDailyData: setDailyData,
  };

  return (
    <DailyContext.Provider value={value}>{children}</DailyContext.Provider>
  );
}

export default DailyContextProvider;
