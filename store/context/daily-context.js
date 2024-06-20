import { createContext, useState } from "react";

export const DailyContext = createContext({
  ids: [],
  datas: [],
  addMedToDailyData: (date, id) => {},
  removeMedFromDailyData: (date, id) => {},
  checkValue: (date, time) => {},
  checkMedsValue: (date, medId) => {},
  toggleTime: (date, time) => {},
});

function DailyContextProvider({ children }) {
  const [checkedMeds, setCheckedMeds] = useState([]);

  const [dailyData, setDailyData] = useState({
    "2024-05-22": {
      아침: false,
      점심: true,
      저녁: false,
      meds: ["02200610885"],
    },
    "2024-05-23": {
      아침: false,
      점심: true,
      저녁: true,
      meds: ["02200610885", "03200610885", "03198900799"],
    },
    "2024-05-24": {
      아침: true,
      점심: false,
      저녁: false,
      meds: ["01198900799", "01200610885"],
    },
    "2024-05-25": {
      아침: false,
      점심: false,
      저녁: true,
      meds: ["03200610885", "03198900799"],
    },
    "2024-05-26": {
      아침: true,
      점심: true,
      저녁: false,
      meds: ["01200610885", "01198900799", "02200610885"],
    },
    "2024-05-27": {
      아침: false,
      점심: true,
      저녁: true,
      meds: ["02200610885", "03200610885", "03198900799"],
    },
    "2024-05-28": {
      아침: true,
      점심: false,
      저녁: false,
      meds: ["01198900799", "01200610885"],
    },
    "2024-05-29": {
      아침: false,
      점심: true,
      저녁: true,
      meds: ["02200610885", "03200610885", "03198900799"],
    },
    "2024-05-30": {
      아침: true,
      점심: false,
      저녁: false,
      meds: ["01198900799", "01200610885"],
    },
    "2024-05-31": {
      아침: false,
      점심: false,
      저녁: true,
      meds: ["03200610885", "03198900799"],
    },
    "2024-06-01": {
      아침: true,
      점심: true,
      저녁: true,
      meds: [
        "03200610885",
        "03198900799",
        "02200610885",
        "01198900799",
        "01200610885",
      ],
    },
    "2024-06-02": {
      아침: false,
      점심: true,
      저녁: true,
      meds: ["02200610885", "03200610885", "03198900799"],
    },
    "2024-06-03": {
      아침: true,
      점심: true,
      저녁: true,
      meds: [
        "03200610885",
        "03198900799",
        "02200610885",
        "01198900799",
        "01200610885",
      ],
    },
    "2024-06-04": {
      아침: true,
      점심: true,
      저녁: true,
      meds: [
        "03200610885",
        "03198900799",
        "02200610885",
        "01198900799",
        "01200610885",
      ],
    },
    "2024-06-05": {
      아침: true,
      점심: true,
      저녁: true,
      meds: [
        "03200610885",
        "03198900799",
        "02200610885",
        "01198900799",
        "01200610885",
      ],
    },
    "2024-06-06": {
      아침: true,
      점심: false,
      저녁: true,
      meds: ["01200610885", "01198900799", "02200610885"],
    },
    "2024-06-07": {
      아침: true,
      점심: false,
      저녁: true,
      meds: ["01200610885", "01198900799", "02200610885"],
    },
    "2024-06-08": {
      아침: true,
      점심: true,
      저녁: false,
      meds: ["01200610885", "01198900799", "02200610885"],
    },
    "2024-06-09": {
      아침: false,
      점심: true,
      저녁: true,
      meds: ["02200610885", "03200610885", "03198900799"],
    },
    "2024-06-10": {
      아침: true,
      점심: false,
      저녁: false,
      meds: ["01198900799", "01200610885"],
    },
    "2024-06-11": {
      아침: false,
      점심: false,
      저녁: true,
      meds: ["03200610885", "03198900799"],
    },
    "2024-06-12": {
      아침: true,
      점심: true,
      저녁: false,
      meds: ["01200610885", "01198900799", "02200610885"],
    },
    "2024-06-13": {
      아침: false,
      점심: true,
      저녁: true,
      meds: ["02200610885", "03200610885", "03198900799"],
    },
    "2024-06-14": {
      아침: true,
      점심: false,
      저녁: false,
      meds: ["01198900799", "01200610885"],
    },
    "2024-06-15": {
      아침: false,
      점심: false,
      저녁: true,
      meds: ["03200610885", "03198900799"],
    },
    "2024-06-16": {
      아침: true,
      점심: true,
      저녁: false,
      meds: ["01200610885", "01198900799", "02200610885"],
    },
    "2024-06-17": {
      아침: false,
      점심: true,
      저녁: true,
      meds: ["02200610885", "03200610885", "03198900799"],
    },
    "2024-06-18": {
      아침: true,
      점심: false,
      저녁: false,
      meds: ["01198900799", "01200610885"],
    },
    "2024-06-19": {
      아침: false,
      점심: false,
      저녁: true,
      meds: ["03200610885", "03198900799"],
    },
    "2024-06-20": {
      아침: true,
      점심: true,
      저녁: true,
      meds: [
        "03200610885",
        "03198900799",
        "02200610885",
        "01198900799",
        "01200610885",
      ],
    },
    "2024-06-21": {
      아침: true,
      점심: false,
      저녁: false,
      meds: ["01198900799", "01200610885"],
    },
  });
  function checkMed(id) {
    setCheckedMeds((currentIds) => [...currentIds, id]);
  }
  const toggleTime = (date, time, bools) => {
    //console.log("TT before", dailyData[date][time]);
    setDailyData((prevData) => {
      // 날짜에 해당하는 데이터 복사
      const dayData = prevData[date];

      // 날짜 데이터가 유효한지 확인
      if (!dayData) {
        return prevData;
      }

      // 시간 데이터가 유효한지 확인
      if (dayData[time] === undefined) {
        return prevData;
      }

      // 새로운 날짜 데이터를 생성
      const updatedDayData = {
        ...dayData,
        [time]: bools, // 시간의 boolean 값을 토글
      };

      // 새 dailyData 객체 생성
      return {
        ...prevData,
        [date]: updatedDayData,
      };
    });
    //console.log("TT after", dailyData[date][time]);
  };

  function addMedToDailyData(date, id) {
    //console.log(dailyData[date]);
    setDailyData((currentData) => {
      const updatedData = { ...currentData };
      const dayData = updatedData[date];

      if (dayData) {
        updatedData[date] = {
          ...dayData,
          meds: [...new Set([...dayData.meds, id])], // 중복 방지
        };
      }
      return updatedData;
    });
  }

  function removeMedFromDailyData(date, id) {
    //console.log(dailyData[date]);
    setDailyData((currentData) => {
      const updatedData = { ...currentData };
      const dayData = updatedData[date];

      if (dayData) {
        // 해당 날짜의 데이터가 존재할 경우
        updatedData[date] = {
          ...dayData,
          meds: dayData.meds.filter((medId) => medId !== id),
        };
      }

      return updatedData;
    });
  }

  function unCheckMed(id, time) {
    setCheckedMeds((currentIds) =>
      currentIds.filter((medIds) => medIds !== id)
    );
  }

  function checkValue(date, time) {
    if (dailyData[date]) {
      return dailyData[date][time];
    } else {
      return false; // 기본적으로 false를 반환하거나, 상황에 맞게 처리하세요.
    }
  }

  function checkMedsValue(date, medId) {
    //console.log(date);
    //console.log(dailyMedsData[date]);
    //console.log(dailyData[date].meds);
    console.log("666", dailyData[date].meds.includes(medId));
    return dailyData[date].meds.includes(medId);
  }

  const value = {
    ids: checkedMeds,
    datas: dailyData,
    addMedToDailyData: addMedToDailyData,
    removeMedFromDailyData: removeMedFromDailyData,
    setDailyData: setDailyData,
    checkValue: checkValue,
    checkMedsValue: checkMedsValue,
    toggleTime: toggleTime,
  };

  return (
    <DailyContext.Provider value={value}>{children}</DailyContext.Provider>
  );
}

export default DailyContextProvider;
