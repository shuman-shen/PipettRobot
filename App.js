import React, { useState } from "react";
import RobotContext from "./context";
import { initPlate } from "./utils/initValues";
import PipetteScreen from "./screens/PipetteScreen";

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
      <PipetteScreen />
    </RobotContext.Provider>
  );
}
