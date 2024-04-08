import { createContext, useState } from "react";

export const DailyContext = createContext({
  ids: [],
  checkMed: (id) => {},
  unCheckMed: (id) => {},
});

function DailyContextProvider({ children }) {
  const [checkedMeds, setCheckedMeds] = useState([]);

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
  };

  return (
    <DailyContext.Provider value={value}>{children}</DailyContext.Provider>
  );
}

export default DailyContextProvider;
