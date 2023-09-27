import { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

type expoConfigExtraEas = {
  eas: {
    projectId: string;
  };
};
const { eas } = Constants.expoConfig?.extra as expoConfigExtraEas;

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice && Platform.OS === "android") {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: eas.projectId,
      })
    ).data;
  } else {
    alert("Must use physical android device for Push Notifications");
  }

  return token;
}

const useExpoPushToken = () => {
  const [expoPushToken, setExpoPushToken] = useState<string>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  return { expoPushToken };
};

export default useExpoPushToken;