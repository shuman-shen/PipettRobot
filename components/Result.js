import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import RobotContext from "../context";

const Result = () => {
  const { currentPos, errMsg, detectedStatus } = useContext(RobotContext);
  return (
    <View style={styles.container}>
      {currentPos && (
        <Text
          style={styles.text}
        >{`Current Position: (X: ${currentPos.X}, Y: ${currentPos.Y})`}</Text>
      )}
      {detectedStatus !== null && (
        <Text style={styles.text}>{`Status: ${
          detectedStatus ? "FULL" : "EMPTY"
        }`}</Text>
      )}
      {errMsg && <Text style={styles.textErr}>{errMsg}</Text>}
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 0.12,
    padding: 4,
  },
  text: {
    fontSize: 16,
    marginBottom: 1,
  },
  textErr: {
    fontSize: 16,
    marginBottom: 1,
    color: "red",
  },
});
