import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  useState,
} from "react-native";
import React from "react";
import { colors } from "../utils/index";

export default function UnitsButton({ unitSystem, setUnitSystem }) {
  return (
    // two buttons that will change the unit system from metric to imperial and change color when selected
    <View style={styles.unitsSystem}>
      <TouchableOpacity
        style={unitSystem === "metric" ? styles.buttonSelected : styles.button}
        onPress={() => setUnitSystem("metric")}
      >
        <Text
          style={unitSystem === "metric" ? styles.textSelected : styles.text}
        >
          C°
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          unitSystem === "imperial" ? styles.buttonSelected : styles.button
        }
        onPress={() => setUnitSystem("imperial")}
      >
        <Text
          style={unitSystem === "imperial" ? styles.textSelected : styles.text}
        >
          F°
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// make a stylesheet for the component
const styles = StyleSheet.create({
  unitsSystem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    // adjust the size of the button
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.Hvit,
    height: 30,
    width: 30,
    margin: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.Granitt,
  },
  textSelected: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.Hvit,
  },
  buttonSelected: {
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.Granitt,
    height: 30,
    width: 30,
    margin: 5,
    color: colors.Hvit,
  },
});
