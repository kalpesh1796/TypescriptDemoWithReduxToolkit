import React, { FC } from "react";
import {
  Text,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";

import { AnswerButtonProps } from "utils/types";

const AnswerButtons: FC<AnswerButtonProps> = (props) => {
  const { answer = "", onPress, disabled, correct } = props;
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.buttonStyle,
        { backgroundColor: disabled ? "#F5F5DC" : "#F5DEB3" },
      ]}
    >
      <Text
        style={[
          styles.buttonTextStyle,
          { color: correct ? "brown" : "black" },
        ]}
      >{answer}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '80%',
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 27,
    height: 38,
    marginTop: 10,
    shadowColor: '#171717',
    ...Platform.select({
      ios: {
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonTextStyle: {
    textAlign: 'left',
    fontSize: 17,
    marginLeft: 8,
  },
});

export default AnswerButtons;
