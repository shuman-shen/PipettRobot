import React from "react";
import AppScreen from "../components/AppScreen";
import Control from "../components/Control";
import Plate from "../components/Plate";
import Result from "../components/Result";

const PipettScreen = () => {
  return (
    <AppScreen>
      <Plate />
      <Result />
      <Control />
    </AppScreen>
  );
};

export default PipettScreen;
