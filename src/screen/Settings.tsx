import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";

import { LightTheme, DarkTheme } from "utils/data";
import { changeTheme } from "../redux/theme/themeSlice";
import { useAppSelector, useAppDispatch } from "src/redux/hooks";

const Settings: FC = () => {
  const dispatch = useAppDispatch();
  const { value, type: themeType } = useAppSelector((state) => state.theme);
  const { backgroundColor, primaryColor } = value;

  const [isEnabled, setIsEnabled] = useState(themeType === "dark");

  useEffect(() => {
    setIsEnabled(themeType === "dark");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(themeType === "dark" ? LightTheme.backgroundColor : DarkTheme.backgroundColor);
    }
    StatusBar.setBarStyle(themeType === "dark" ? "light-content" : "dark-content");
  }, [themeType]);

  const toggleSwitch = () => {
    dispatch(changeTheme());
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.btnStyle, { borderColor: primaryColor }]}>
        <Text style={{ fontSize: 15, fontWeight: "bold", color: primaryColor }}>Dark Mode</Text>
        <Switch
          value={isEnabled}
          onValueChange={toggleSwitch}
          ios_backgroundColor={"#737373"}
          trackColor={{ false: "#737373", true: "#FFFFFF" }}
          thumbColor={themeType === "dark" ? "#000000" : "#FFFFFF"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Settings;