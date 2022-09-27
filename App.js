import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import { colors } from "./utils/index";
import { FontAwesome5 } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import UnitsButton from "./components/UnitsButton";
import ReloadButton from "./components/ReloadButton";
import WeatherDetails from "./components/WeatherDetails";
import { WEATHER_API_KEY } from "@env";

const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [errorMessage, setErrormessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");

  console.log("WEATHER_API_KEY: ", WEATHER_API_KEY);

  // Load any resources or data that you need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const fontAssets = cacheFonts([FontAwesome5.font]);

        await Promise.all([...fontAssets]);
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  useEffect(() => {
    load();
  }, [unitSystem]);
  async function load() {
    setCurrentWeather(null);
    setErrormessage(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrormessage("Access to location is needed to run the app");
        alert("Access to location is needed to run the app");
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const weatherUrl = `${BASE_WEATHER_URL}&lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl);
      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrormessage(result.message);
      }
    } catch (error) {
      setErrormessage(error.message);
    }
  }

  if (currentWeather && appIsReady) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <ReloadButton load={load} />
          <WeatherInfo
            currentWeather={currentWeather}
            unitSystem={unitSystem}
          />
          <UnitsButton unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitSystem={unitSystem}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.Granitt} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Varde,
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
});
