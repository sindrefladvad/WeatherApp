import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../utils/index";
import { Feather } from "@expo/vector-icons";

export default function WeatherDetails({ currentWeather, unitSystem }) {
  const {
    sys: { sunrise, sunset },
  } = currentWeather;
  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 2,
            borderRightColor: colors.Varde,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <Feather name="sunrise" size={24} color={colors.Granitt} />
            <View style={styles.weatherDetailsItems}>
              <Text>Sunrise</Text>
              <Text style={styles.detailsText}>
                {new Date(sunrise * 1000).toLocaleTimeString(
                  navigator.language,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <Feather name="sunset" size={24} color={colors.Granitt} />
            <View style={styles.weatherDetailsItems}>
              <Text>Sunset</Text>
              <Text style={styles.detailsText}>
                {new Date(sunset * 1000).toLocaleTimeString(
                  navigator.language,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: "auto",
    backgroundColor: colors.Hvit,
    borderRadius: 20,
    margin: 15,
  },
  weatherDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItems: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  detailsText: {
    fontSize: 16,
    lineHeight: 36,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
