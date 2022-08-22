import { Appearance } from "react-native";
import { createSlice } from "@reduxjs/toolkit";

import { ThemeState } from "utils/types";
import { DarkTheme, LightTheme } from "utils/data";

const initialState: ThemeState = {
  type: Appearance.getColorScheme(),
  value: Appearance.getColorScheme() === "dark" ? DarkTheme : LightTheme,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.value = state.type === "dark" ? LightTheme : DarkTheme;
      state.type = state.type === "dark" ? "light" : "dark";
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
