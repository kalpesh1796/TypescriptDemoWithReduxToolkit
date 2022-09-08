/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import Quiz from 'screen/Quiz';
import Settings from 'screen/Settings';

import { useAppSelector } from "src/redux/hooks";

const Stack = createNativeStackNavigator();

const App = () => {
  const themeType = useAppSelector((state) => state.theme.type);
  return (
    <NavigationContainer theme={themeType === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {/* <Stack.Screen name="Quiz" component={Quiz} /> */}
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
