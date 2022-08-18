import React, { FC } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";

import { QuestionProps } from "utils/types";

const Question: FC<QuestionProps> = (props) => {
  const { question, questionNo } = props;
  return (
    <View style={styles.questioncontainer}>
      <Text style={styles.textstyle}>{questionNo}</Text>
      <Text style={styles.questionStyle}>{question}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  questioncontainer: {
    marginTop: 10,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textstyle: {
    padding: 15,
    fontSize: 15,
    color: 'blue',
  },
  questionStyle: {
    fontSize: 15,
    color: 'black',
    marginRight: 7,
  }
});

export default Question;
