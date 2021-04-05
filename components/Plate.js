import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import RobotContext from "../context";
import colors from "../utils/colors";
import Well from "./Well";

const Plate = () => {
  const { plate } = useContext(RobotContext);

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
