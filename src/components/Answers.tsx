import React, { FC } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import AnswerButtons from "components/AnswerButtons";

import { AnswerProps } from "utils/types";

const Answers: FC<AnswerProps> = (props) => {
  const {
    userAnswer,
    checkAnswer,
    answers = [],
    setCorrectAnswer,
  } = props;
  return (
    <View style={styles.answerContainer}>
      {answers.map((answer, key) => (
        <AnswerButtons
          key={key}
          answer={answer}
          disabled={!!userAnswer}
          correct={userAnswer?.correctAnswer === answer}
          onPress={() => {
            setCorrectAnswer.current = answer;
            checkAnswer();
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
});

export default Answers;

