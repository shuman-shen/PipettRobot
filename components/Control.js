import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import RobotContext from "../context";
import colors from "../utils/colors";
import { initPlate } from "../utils/initValues";
import AppForm from "./AppForm";
import ControlBtn from "./ControlBtn";
import Report from "./Report";

const Control = () => {
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

  const [showInput, setShowInput] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleShowInput = (status) => {
    if (status === undefined) {
      setShowInput(!showInput);
    } else setShowInput(status);
  };

  const handleDetect = () => {
    setErrMsg(null);
    if (currentPos === null) {
      setErrMsg("ERR: Pipett not placed.");
      return;
    }

    const res = plate.find(
      (item) =>
        item.coordinates.X === currentPos.X &&
        item.coordinates.Y === currentPos.Y
    );
    if (res === undefined) {
      setErrMsg("ERR: Well not found");
    } else {
      setDetectedStatus(res.filled);
    }
  };

  const handleDrop = () => {
    setErrMsg(null);
    let res = null;
    if (currentPos && detectedStatus === null) {
      res = plate.find(
        (item) =>
          item.coordinates.X === currentPos.X &&
          item.coordinates.Y === currentPos.Y
      );
      if (res === undefined) {
        setErrMsg("ERR: Well not found");
        return;
      } else if (res.filled === true) {
        setDetectedStatus(true);
        setErrMsg(`Well (${currentPos.X}, ${currentPos.Y}) is already full.`);
        return;
      } else {
        setDetectedStatus(false);
      }
    }
    if (
      currentPos &&
      (detectedStatus === false || (res !== null && res.filled === false))
    ) {
      const newPlate = plate.map((item) => {
        if (
          currentPos.X === item.coordinates.X &&
          currentPos.Y === item.coordinates.Y
        ) {
          return { ...item, filled: true };
        } else return item;
      });
      setPlate(newPlate);
      setDetectedStatus(true);
      return;
    }

    if (currentPos && detectedStatus === true) {
      setErrMsg(`Well (${currentPos.X}, ${currentPos.Y}) is already full.`);
      return;
    }
    if (!currentPos) setErrMsg("Please move the pipett to a valid positon.");
  };

  const handleMoveN = () => {
    setErrMsg(null);
    if (currentPos === null) {
      setErrMsg("ERR: Pipett not placed.");
      return;
    }
    if (currentPos.Y === 4) {
      setErrMsg("Pipett cannot go further North.");
    } else {
      const index = plate.findIndex(
        ({ coordinates }) =>
          currentPos.X === coordinates.X && currentPos.Y === coordinates.Y
      );
      const newPlate = [...plate];
      newPlate[index].pipettOn = false;
      newPlate[index + 5].pipettOn = true;
      setCurrentPos({
        X: newPlate[index + 5].coordinates.X,
        Y: newPlate[index + 5].coordinates.Y,
      });
      setPlate(newPlate);
      setDetectedStatus(null);
      setErrMsg(null);
    }
  };
  const handleMoveS = () => {
    setErrMsg(null);
    if (currentPos === null) {
      setErrMsg("ERR: Pipett not placed.");
      return;
    }
    if (currentPos.Y === 0) {
      setErrMsg("Pipett cannot go further South.");
    } else {
      const index = plate.findIndex(
        ({ coordinates }) =>
          currentPos.X === coordinates.X && currentPos.Y === coordinates.Y
      );
      const newPlate = [...plate];
      newPlate[index].pipettOn = false;
      newPlate[index - 5].pipettOn = true;
      setCurrentPos({
        X: newPlate[index - 5].coordinates.X,
        Y: newPlate[index - 5].coordinates.Y,
      });
      setPlate(newPlate);
      setDetectedStatus(null);
      setErrMsg(null);
    }
  };
  const handleMoveW = () => {
    setErrMsg(null);
    if (currentPos === null) {
      setErrMsg("ERR: Pipett not placed.");
      return;
    }
    if (currentPos.X === 0) {
      setErrMsg("Pipett cannot go further West.");
    } else {
      const index = plate.findIndex(
        ({ coordinates }) =>
          currentPos.X === coordinates.X && currentPos.Y === coordinates.Y
      );
      const newPlate = [...plate];
      newPlate[index].pipettOn = false;
      newPlate[index - 1].pipettOn = true;
      setCurrentPos({
        X: newPlate[index - 1].coordinates.X,
        Y: newPlate[index - 1].coordinates.Y,
      });
      setPlate(newPlate);
      setDetectedStatus(null);
      setErrMsg(null);
    }
  };
  const handleMoveE = () => {
    setErrMsg(null);
    if (currentPos === null) {
      setErrMsg("ERR: Pipett not placed.");
      return;
    }
    if (currentPos.X === 4) {
      setErrMsg("Pipett cannot go further East.");
    } else {
      const index = plate.findIndex(
        ({ coordinates }) =>
          currentPos.X === coordinates.X && currentPos.Y === coordinates.Y
      );
      const newPlate = [...plate];
      newPlate[index].pipettOn = false;
      newPlate[index + 1].pipettOn = true;
      setCurrentPos({
        X: newPlate[index + 1].coordinates.X,
        Y: newPlate[index + 1].coordinates.Y,
      });
      setPlate(newPlate);
      setDetectedStatus(null);
      setErrMsg(null);
    }
  };

  const handleReport = () => {
    setErrMsg(null);

    if (!currentPos) {
      setErrMsg("ERR: Pipett not placed.");
      return;
    }

    if (detectedStatus === null) {
      const res = plate.find(
        (item) =>
          item.coordinates.X === currentPos.X &&
          item.coordinates.Y === currentPos.Y
      );
      if (res === undefined) {
        setErrMsg("ERR: Well not found");
      } else {
        setDetectedStatus(res.filled);
      }
    }
    setShowReport(true);
  };

  const handleReset = () => {
    setCurrentPos(null);
    setDetectedStatus(null);
    setErrMsg(null);
    setSequence([]);
    setPlate(initPlate);
  };

  return (
    <View style={styles.container}>
      <ControlBtn title="Place" onPress={(status) => handleShowInput(status)} />
      {sequence.length > 0 && (
        <View>
          <View style={styles.btnGroup}>
            <ControlBtn
              title="Detect"
              style={styles.btnBlue}
              onPress={handleDetect}
            />
            <ControlBtn
              title="Drop"
              style={styles.btnBlue}
              onPress={handleDrop}
            />
          </View>

          <View style={styles.btnGroup}>
            <ControlBtn
              title="Move N"
              style={styles.btnPurple}
              onPress={handleMoveN}
            />
            <ControlBtn
              title="Move S"
              style={styles.btnPurple}
              onPress={handleMoveS}
            />
          </View>
          <View style={styles.btnGroup}>
            <ControlBtn
              title="Move W"
              style={styles.btnPurple}
              onPress={handleMoveW}
            />
            <ControlBtn
              title="Move E"
              style={styles.btnPurple}
              onPress={handleMoveE}
            />
          </View>

          <View style={styles.btnGroup}>
            <ControlBtn
              style={styles.btnBlue}
              title="Report"
              onPress={handleReport}
            />
            <ControlBtn
              style={styles.btnBlue}
              title="Reset"
              onPress={handleReset}
            />
          </View>
        </View>
      )}

      {showInput && <AppForm onClose={() => setShowInput(false)} />}
      {showReport && <Report onClose={() => setShowReport(false)} />}
    </View>
  );
};

export default Control;

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btnRed: {
    flex: 0.5,
    backgroundColor: colors.red,
  },
  btnBlue: {
    flex: 0.5,
    backgroundColor: colors.blue,
  },
  btnPurple: {
    flex: 0.5,
    backgroundColor: colors.purple,
  },
});
