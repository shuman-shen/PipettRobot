import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
//import Well from "./components/Well";
import AppScreen from "./components/AppScreen";
import RobotContext from "./context";
//import PipettScreen from "./screens/PipettScreen";
import AppForm from "./components/AppForm";
import { initPlate, initCoordinates } from "./utils/initValues";
import PipettScreen from "./screens/PipettScreen";

export default function App() {
  const [plate, setPlate] = useState(initPlate);
  const [currentPos, setCurrentPos] = useState(null);
  const [detectedStatus, setDetectedStatus] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [errMsg, setErrMsg] = useState(null);

  return (
    <RobotContext.Provider
      value={{
        plate,
        setPlate,
        currentPos,
        setCurrentPos,
        detectedStatus,
        setDetectedStatus,
        sequence,
        setSequence,
        errMsg,
        setErrMsg,
      }}
    >
      <PipettScreen />
    </RobotContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    flexWrap: "wrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
