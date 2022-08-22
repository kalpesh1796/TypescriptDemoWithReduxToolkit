import React, { FC } from "react";
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";

import { QuestionProps } from "utils/types";
import { useAppSelector } from "service/hooks";

const Question: FC<QuestionProps> = (props) => {
  const { question, questionNo } = props;
  const { width } = useWindowDimensions();

  const { value } = useAppSelector((state) => state.theme);
  const { primaryColor, secondaryColor } = value;
  return (
    <View style={styles.questioncontainer}>
      <Text style={[styles.textstyle, { color: secondaryColor }]}>{questionNo}</Text>
      <View style={{ flex: 1 }}>
        <RenderHTML
          contentWidth={width}
          source={{ html: question }}
          baseStyle={{...styles.questionStyle, color: primaryColor}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questioncontainer: {
    marginTop: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: "flex-start",
  },
  textstyle: {
    fontSize: 15,
    marginRight: 15,
    fontWeight: "bold",
  },
  questionStyle: {
    fontSize: 15,
    fontWeight: "bold",
  }
});

export default Question;
