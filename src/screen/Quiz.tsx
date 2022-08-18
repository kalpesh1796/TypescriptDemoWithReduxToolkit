import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Alert,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Questions from "components/Questions";
import Answers from "components/Answers";

import { Answer, Question } from "utils/types";
import { getQuestioJNS } from "service/api";

const Quiz: FC = () => {
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
      console.log(newquestions);
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
    <View style={styles.container}>
      {
        loading ? (
          <View style={styles.emptyView}>
            <ActivityIndicator
              size={50}
              color="black"
            />
          </View>
        ) : (
          <Fragment>
            <View style={styles.questionDataContainer}>
              <Text style={styles.textstyle}>Questions</Text>
              <Text style={styles.textstyle}>
                {number + 1}/{totalQuestion}
              </Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.textstyle}>Score : {score}</Text>
            </View>
            {question.length > 0 ? (
              <Fragment>
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
              </Fragment>
            ) : null}
          </Fragment>
        )
      }
      <View>
        {!gameOver && !loading && number != totalQuestion - 1 ? (
          <Pressable style={styles.btnStyl} onPress={() => nextQuestion()}>
            <Text style={styles.btnTxt}>{"->"}</Text>
          </Pressable>
        ) : number == totalQuestion - 1 ? (
          <Pressable style={styles.btnStyl} onPress={() => startQuiz()}>
            <Text style={styles.btnTxt}>Play</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  questionDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
    backgroundColor: 'white',
  },
  textstyle: { padding: 15, fontSize: 15, color: 'blue' },
  bottomview: {
    padding: 13,
    backgroundColor: 'blue',
    borderRadius: 300,
    width: 70,
    height: 70,
    position: 'absolute',
    right: 20,
    top: 550,
  },
  questioncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    paddingRight: 16,
  },
  btnStyl: {
    alignSelf: "center",
  },
  btnTxt: {
    margin: 20,
    fontSize: 40,
    color: "#000",
  },
  emptyView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Quiz;