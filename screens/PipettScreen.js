import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppScreen from "../components/AppScreen";
import Control from "../components/Control";
import Plate from "../components/Plate";
import Result from "../components/Result";
import RobotContext from "../context";

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

const styles = StyleSheet.create({});
