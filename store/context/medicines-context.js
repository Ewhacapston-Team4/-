import { createContext, useState } from "react";

export const MedicinesContext = createContext({
  ids: [],
  addMed: (id) => {},
  deleteMed: () => {},
});

function MedicinesContextProvider({ children }) {
  const [usersMedIds, setUsersMedIds] = useState([]);

  function addMed(id) {
    setUsersMedIds((currentIds) => [...currentIds, id]);
  }

  function removeMed(id) {
    setUsersMedIds((currentIds) =>
      currentIds.filter((medIds) => medIds !== id)
    );
  }

  const value = {
    ids: usersMedIds,
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
