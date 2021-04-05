import React, { useContext } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import RobotContext from "../context";
import ControlBtn from "./ControlBtn";

const Report = ({ onClose }) => {
  const {
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
  } = useContext(RobotContext);
  return (
    <Modal>
      <View style={styles.container}>
        <Text style={styles.textBold}>Report</Text>
        {currentPos && detectedStatus !== null && (
          <Text style={styles.text}>{`Current well: ${currentPos.X}, ${
            currentPos.Y
          } ${detectedStatus ? "FULL" : "EMPTY"}`}</Text>
        )}
        {errMsg && <Text>{`ERR: ${errMsg}`}</Text>}
        <ControlBtn title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "80%",
    width: "80%",
    backgroundColor: "white",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  textBold: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 20,
  },
});
