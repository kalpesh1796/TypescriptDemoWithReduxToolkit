import axios from 'axios';

import { Question } from "utils/types";
 
export const _ = (array: any[]) => [...array].sort(() => Math.random() - 0.7);
 
export const getQuestioJNS = async () => {
 const endpoint = 'https://opentdb.com/api.php?amount=10&category=9';
 const promise = await axios.get(endpoint);
 return promise.data.results.map((question: Question) => ({
   ...question,
   answers: _([...question.incorrect_answers, question.correct_answer]),
 }));
};