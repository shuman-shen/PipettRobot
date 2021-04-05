import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import colors from "../utils/colors";

const ControlBtn = ({ title, onPress, style, disabled }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      style={disabled ? [style, styles.disabled] : [styles.container, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

export default ControlBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purple,
    borderRadius: 5,
    height: 32,
    padding: 5,
    alignItems: "center",
    margin: 4,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  disabled: {
    backgroundColor: colors.grey,
    borderRadius: 5,
    height: 32,
    padding: 5,
    alignItems: "center",
    margin: 4,
  },
});
