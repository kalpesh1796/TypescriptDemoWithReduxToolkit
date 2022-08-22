import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Questions from "components/Questions";
import Answers from "components/Answers";

import { Answer, Question, QuizScreenProps } from "utils/types";
import { getQuestioJNS } from "service/api";
import { useAppSelector } from "service/hooks";

const Quiz: FC<QuizScreenProps> = (props) => {
  const { navigation } = props;

  const { value } = useAppSelector((state) => state.theme);
  const { backgroundColor, primaryColor, secondaryColor } = value;

  const [totalQuestion] = useState(10);
  const [score, setscore] = useState(0);
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [question, setQuestion] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

  const setCorrectAnswer = useRef(null);

  useEffect(() => {
    startQuiz();
  }, []);

  const startQuiz = async () => {
    try {
      setNumber(0);
      setLoading(true);
      setGameOver(false);
      const newquestions = await getQuestioJNS();
      setQuestion(newquestions);
      setscore(0);
      setUserAnswers([]);
    } catch (error) {
      Alert.alert("Error", (error as Error)?.message ?? "");
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    const nextq = number + 1;
    if (nextq == totalQuestion) {
      setGameOver(true);
    } else {
      setNumber(nextq);
    }
  };

  const checkAnswer = () => {
    if (!gameOver) {
      const answer = setCorrectAnswer.current;

      const correcta = question[number].correct_answer === answer;

      if (correcta) setscore(prev => prev + 1);

      const answerobject: Answer = {
        question: question[number].question,
        answer: answer || "",
        correct: correcta,
        correctAnswer: question[number].correct_answer || "",
      };

      setUserAnswers(prev => [...prev, answerobject]);
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {
        loading ? (
          <View style={styles.emptyView}>
            <ActivityIndicator
              size={50}
              color={primaryColor}
            />
          </View>
        ) : (
          <Fragment>
            <Pressable
              style={[styles.settingBtnStyle, { backgroundColor, shadowColor: primaryColor }]}
              onPress={() => navigation.navigate("Settings")}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold", color: primaryColor }}>Settings</Text>
            </Pressable>
            <View style={[styles.questionDataContainer, { backgroundColor, shadowColor: primaryColor }]}>
              <Text style={[styles.textstyle, { color: secondaryColor }]}>Questions</Text>
              <Text style={[styles.textstyle, { color: secondaryColor }]}>
                {number + 1}/{totalQuestion}
              </Text>
              <View style={{ marginLeft: 20 }}>
                <Text style={[styles.textstyle, { color: secondaryColor }]}>Score : {score}</Text>
              </View>
            </View>
            {question.length > 0 ? (
              <View style={[styles.cardContainer, { backgroundColor, shadowColor: primaryColor }]}>
                <Questions
                  questionNo={number + 1}
                  question={question[number].question}
                />
                <Answers
                  checkAnswer={checkAnswer}
                  answers={question[number].answers}
                  setCorrectAnswer={setCorrectAnswer}
                  userAnswer={userAnswers ? userAnswers[number] : undefined}
                />
              </View>
            ) : null}
          </Fragment>
        )
      }
      <Fragment>
        {!gameOver && !loading && number != totalQuestion - 1 ? (
          <Pressable style={[styles.btnStyl, { backgroundColor, shadowColor: primaryColor }]} onPress={() => nextQuestion()}>
            <Text style={[styles.btnTxt, { color: primaryColor }]}>Next</Text>
          </Pressable>
        ) : number == totalQuestion - 1 ? (
          <Pressable style={[styles.btnStyl, { backgroundColor, shadowColor: primaryColor }]} onPress={() => startQuiz()}>
            <Text style={[styles.btnTxt, { color: primaryColor }]}>Play</Text>
          </Pressable>
        ) : null}
      </Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  textstyle: {
    padding: 15,
    fontSize: 15,
  },
  questioncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    paddingRight: 16,
  },
  btnStyl: {
    marginTop: 15,
    borderRadius: 10,
    alignSelf: "center",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  btnTxt: {
    margin: 20,
    fontSize: 40,
    fontWeight: "bold",
  },
  emptyView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  settingBtnStyle: {
    alignSelf: "flex-end",
    marginRight: 15,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardContainer: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default Quiz;