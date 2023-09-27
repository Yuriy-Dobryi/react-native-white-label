import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, PermissionsAndroid } from "react-native";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import useExpoPushToken from "./hooks/useExpoPushToken";

type ExtraConfig = {
  logo: string;
  logoSize: number;
  primaryColor: string;
  primaryFontWeight: '400' | 'bold';
};

const {
  logo, logoSize, primaryColor, primaryFontWeight }
  = Constants.expoConfig?.extra as ExtraConfig;



export default function App() {
  const { expoPushToken } = useExpoPushToken();
  console.log(expoPushToken);

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: primaryColor,
          fontWeight: primaryFontWeight,
          fontSize: logoSize,
        }}
      >
        {logo}
      </Text>

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
