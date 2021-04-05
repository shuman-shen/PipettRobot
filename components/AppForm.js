import { Formik } from "formik";
import React, { useContext } from "react";
import { Modal, StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as Yup from "yup";
import AppScreen from "./AppScreen";
import RobotContext from "../context";
import colors from "../utils/colors";
import ControlBtn from "./ControlBtn";

const placeValidationScheme = Yup.object().shape({
  X: Yup.number().min(0).max(4).required(),
  Y: Yup.number().min(0).max(4).required(),
});

const AppForm = ({ onClose }) => {
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

  const handlePlace = (values) => {
    setErrMsg(null);
    if (
      currentPos !== null &&
      parseInt(values.X) === currentPos.X &&
      parseInt(values.Y) === currentPos.Y
    ) {
      onClose(false);
      return;
    }

    setCurrentPos({
      X: parseInt(values.X),
      Y: parseInt(values.Y),
    });

    const newPlate = plate.map((item) => {
      if (
        item.coordinates.X === parseInt(values.X) &&
        item.coordinates.Y === parseInt(values.Y)
      ) {
        return { ...item, pipettOn: true };
      } else return { ...item, pipettOn: false };
    });
    setPlate(newPlate);
    const newSeq = [...sequence];
    newSeq.push(`PLACE ${values.X},${values.Y}`);
    setSequence(newSeq);
    setDetectedStatus(null);
    setErrMsg(null);
    onClose(false);
  };
  return (
    <Modal>
      <View style={styles.container}>
        <Formik
          initialValues={{ X: "", Y: "" }}
          validationSchema={placeValidationScheme}
          onSubmit={(values) => handlePlace(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <TextInput
                name="X"
                onChangeText={handleChange("X")}
                onBlur={handleBlur("X")}
                value={values.X}
                keyboardType="number-pad"
                style={styles.input}
                clearTextOnFocus={true}
                placeholder="X value"
              />
              {errors.X && touched.X && (
                <Text style={styles.errorText}>{errors.X}</Text>
              )}
              <TextInput
                name="Y"
                onChangeText={handleChange("Y")}
                onBlur={handleBlur("Y")}
                value={values.Y}
                keyboardType="number-pad"
                style={styles.input}
                clearTextOnFocus={true}
                placeholder="Y value"
              />
              {errors.Y && touched.Y && (
                <Text style={styles.errorText}>{errors.Y}</Text>
              )}
              <ControlBtn
                onPress={handleSubmit}
                title="Place"
                disabled={!isValid}
              />
              <ControlBtn title="Cancel" onPress={onClose} />
            </>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default AppForm;

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.purple,
    textAlign: "center",
    fontSize: 20,
  },
  errorText: {
    color: "red",
  },
});
