import React, { FC } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { HeaderProps } from "utils/types";

const HeaderComponent: FC<HeaderProps> = (props) => {
  const { title = "" } = props;
  return (
    <SafeAreaView>
      <Text style={styles.titleStyle}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HeaderComponent;