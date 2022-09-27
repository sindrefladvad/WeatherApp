import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { colors } from "../utils/index";

export default function WeatherInfo({ currentWeather, unitSystem }) {
  const {
    main: { temp, feels_like },
    weather: [details],
    name,
    wind: { speed },
  } = currentWeather;
  const { icon, main, description } = details;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  const tempratureSymbol = unitSystem === "metric" ? ` ℃` : `℉`;
  const windSpeed =
    unitSystem === "metric"
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} m/h`;
  return (
    <View style={styles.weatherInfo}>
      <Text style={styles.cityName}>{name}</Text>
      <Text style={styles.textPrimary}>
        {temp}
        {tempratureSymbol}
      </Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textMedium}>{main}</Text>
      <Text style={styles.weatherDescription}>{description}</Text>
      <Text style={styles.textSecondary}>Wind {windSpeed}</Text>
      <Text style={styles.textSecondary}>
        Feels like {feels_like}
        {tempratureSymbol}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.Hvit,
    borderRadius: 20,
    padding: 20,
    margin: 15,
  },
  cityName: {
    fontSize: 30,
    color: colors.Granitt,
    marginBottom: 10,
  },

  weatherIcon: {
    width: 100,
    height: 100,
  },
  textPrimary: {
    fontSize: 40,
    color: colors.Granitt,
  },
  textMedium: {
    fontSize: 30,
    color: colors.Granitt,
    marginTop: 10,
  },

  textSecondary: {
    fontSize: 20,
    color: colors.Granitt,
    marginTop: 10,
  },
  weatherDescription: {
    textTransform: "capitalize",
    fontSize: 20,
    color: colors.Granitt,
    marginTop: 10,
  },
});
