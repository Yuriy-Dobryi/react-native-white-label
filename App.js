import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Constants from "expo-constants";
const {
  extra: { logo, logoSize, primaryColor, primaryFontWeight },
} = Constants.expoConfig;
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: "aa63b213-876d-4191-b6c4-dca648e72733",
    }));
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    return () =>
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
  }, []);
  
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