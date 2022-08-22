import React, { FC } from "react";
import {
  Text,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";

import { useAppSelector } from "service/hooks";
import { AnswerButtonProps } from "utils/types";

const AnswerButtons: FC<AnswerButtonProps> = (props) => {
  const { answer = "", onPress, disabled, correct } = props;

  const { value } = useAppSelector((state) => state.theme);
  const { backgroundColor, primaryColor, secondaryColor } = value;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.buttonStyle,
        {
          backgroundColor: disabled ?  `${secondaryColor}50` : secondaryColor,
          shadowColor: primaryColor,
        },
      ]}
    >
      <Text
        style={[
          styles.buttonTextStyle,
          { color: correct ? secondaryColor : backgroundColor },
        ]}
      >{answer}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 38,
    width: '80%',
    marginTop: 10,
    marginLeft: 27,
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
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
    fontSize: 17,
    marginLeft: 8,
    fontWeight: "bold"
  },
});

export default AnswerButtons;
