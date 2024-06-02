import React, { createContext, useState, useContext } from "react";
import Pill from "../../models/pill";

const PillsContext = createContext();

export const PillsProvider = ({ children }) => {
  const [type, setType] = useState("");
  const [pills, setPills] = useState([
    new Pill(
      "198900799",
      "가베스캡슐",
      "위장약",
      require("../../assets/images/image4.png"),
      true,
      false,
      true
    ),
    new Pill(
      "200604164",
      "웰트민정",
      "식욕억제제",
      require("../../assets/images/image5.png"),
      true,
      true,
      true
    ),
  ]);

  const addPills = (newPills) => {
    setPills((currentPills) => [...currentPills, ...newPills]);
  };

  const setPillType = (type) => {
    setType(type);
  };
  const getPillType = () => {
    return type;
  };

  return (
    <PillsContext.Provider
      value={{ pills, addPills, setPillType, getPillType }}
    >
      {children}
    </PillsContext.Provider>
  );
};

export const usePills = () => {
  return useContext(PillsContext);
};
