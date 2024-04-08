import { createContext, useState } from "react";

export const MedicinesContext = createContext({
  ids: [],
  addMed: (id) => {},
  deleteMed: () => {},
});

function MedicinesContextProvider({ children }) {
  const [usersMeds, setUsersMeds] = useState([]);

  function addMed(id) {
    setUsersMeds((currentIds) => [...currentIds, id]);
  }

  function removeMed(id) {
    setUsersMeds((currentIds) => currentIds.filter((medIds) => medIds !== id));
  }

  const value = {
    ids: usersMeds,
    addMed: addMed,
    removeMed: removeMed,
  };

  return (
    <MedicinesContext.Provider value={value}>
      {children}
    </MedicinesContext.Provider>
  );
}

export default MedicinesContextProvider;
