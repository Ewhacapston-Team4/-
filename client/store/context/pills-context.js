import React, { createContext, useState, useContext } from "react";
import Pill from "../../models/pill";
import { CameraType } from "expo-image-picker";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const PillsContext = createContext();

export const PillsProvider = ({ children }) => {
  const [type, setType] = useState("");
  const [cameraType, setCameraType] = useState("");
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
      "200610885",
      "디에타민정",
      "자율신경제",
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
  const setPhotoType = (type) => {
    setCameraType(type);
  };
  const getPhotoType = () => {
    return cameraType;
  };

  return (
    <PillsContext.Provider
      value={{
        pills,
        addPills,
        setPillType,
        getPillType,
        setPhotoType,
        getPhotoType,
      }}
    >
      {children}
    </PillsContext.Provider>
  );
};

export const usePills = () => {
  return useContext(PillsContext);
};
