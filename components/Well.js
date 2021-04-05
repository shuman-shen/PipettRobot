import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Well = ({ coordinates, pipettOn, color }) => {
  return (
    <View style={styles(color).container}>
      <Text
        style={styles(color).text}
      >{`(${coordinates.X}, ${coordinates.Y})`}</Text>
      {pipettOn ? (
        <Text style={styles(color).textLarge}>{"\u2605"}</Text>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default Well;

const styles = (color) =>
  StyleSheet.create({
    container: {
      width: "20%",
      height: "20%",
      backgroundColor: color,
      borderColor: "white",
      borderWidth: 2,
      padding: 2,
      alignItems: "center",
    },
    text: {
      color: "white",
    },
    textLarge: {
      fontSize: 20,
      color: "white",
    },
  });
