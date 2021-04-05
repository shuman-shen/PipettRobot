import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import RobotContext from "../context";
import colors from "../utils/colors";
import { initPlate, initCoordinates } from "../utils/initValues";
import Well from "./Well";

const initSeq = ["PLACE 1,2", "DETECT", "DROP", "MOVE N", "REPORT"];

const Plate = () => {
  const { plate, setPlate } = useContext(RobotContext);

  // For further backend integration
  // Load initial plate layout from backend API
  //
  // useEffect(() => {
  //   setPlate(initPlate)
  // })

  return (
    <View style={styles.container}>
      {plate.map((item, index) => (
        <Well
          key={index}
          coordinates={item.coordinates}
          color={item.filled ? colors.red : colors.green}
          pipettOn={item.pipettOn}
          text={index}
        />
      ))}
    </View>
  );
};

export default Plate;

const styles = StyleSheet.create({
  container: {
    flex: 0.48,
    flexWrap: "wrap-reverse",
    flexDirection: "row",
  },
});
