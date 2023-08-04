import React, {useState} from 'react';

import {View, Text, StyleSheet, Image, Pressable, Alert} from 'react-native';
import questions from './../../../../assets/data/imageMultipleChoiceQuestion';

const CustomText = (props: any) => {
  return <Text style={styles.textStyle}>{props.name}</Text>;
};

const ImageOption = (props: any) => {
  const {name, isSelected = true, image, handlePress} = props;
  return (
    <Pressable
      onPress={() => {
        handlePress(name);
      }}
      style={[
        styles.optionContainer,
        isSelected ? styles.selectedContainer : {},
      ]}>
      <Image resizeMode="contain" style={styles.image} source={{uri: image}} />
      <Text style={isSelected ? styles.selectedText : {}}>{name}</Text>
    </Pressable>
  );
};

const ProgressBar = ({progress}: any) => {
  return (
    <View
      style={{
        flex: 1,
        height: 30,
        backgroundColor: 'lightgrey',
        borderRadius: 40,
      }}>
      <View
        style={{
          backgroundColor: 'orange',
          height: 30,
          width: `${progress * 100}%`,
          borderRadius: 40,
        }}
      />
    </View>
  );
};

// useState, useEffect ,props

export const Dulingo = () => {
  const [questionIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [life, setLife] = useState(3);

  const handlePress = (name: string) => {
    console.warn(name);
  };
  return (
    <View style={styles.root}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <ProgressBar progress={questionIndex / questions.length} />
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}> {life}</Text>
          {/* Display heart Image
            show life 5 using useState
          */}
        </View>
      </View>

      <CustomText name={questions[questionIndex]?.question} />
      <View style={styles.optionsContainer}>
        {questions[questionIndex]?.options?.map(option => {
          return (
            // <Text>Image option</Text>
            <ImageOption
              name={option.text}
              image={option.image}
              handlePress={() => {
                console.log(option);
                setSelectedOption(option);
              }}
              isSelected={option.id === selectedOption?.id}
            />
          );
        })}
        {/* {question.options.map(option => {
          return <ImageOption name={option.text} />;
        })} */}
      </View>
      <Pressable
        disabled={selectedOption == null || life == 0}
        onPress={() => {
          if (life <= 0) {
            Alert.alert('Game Over');
            return;
          }
          if (selectedOption['correct']) {
            setCurrentIndex(() => questionIndex + 1);
          } else {
            //wrong answer
            setLife(() => life - 1);
          }
          return;
          // if (questionIndex >= questions.length) {
          //   setCurrentIndex(() => 0);
          //   Alert.alert('Game completed');
          // } else {
          //   setCurrentIndex(() => questionIndex + 1);
          // }
          if (selectedOption['correct']) {
            // total question = questions.length 4
            // current question index = questionIndex 4
          } else {
            // decrease life if user choses wrong answer
            // check if life ==0 then display Alert with message game over
            // Restart game
            Alert.alert('Wrong answer');
          }
        }}
        style={{
          backgroundColor:
            selectedOption == null || life == 0 ? 'grey' : 'green',
          padding: 10,
          marginTop: 10,
          borderRadius: 20,
        }}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 23}}>
          Check
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    flex: 1,
  },
  optionContainer: {
    borderWidth: 2,
    width: '48%',
    height: '48%',
    borderColor: 'lightgrey',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedContainer: {
    backgroundColor: 'red',
  },
  selectedText: {
    color: '#40BEF7',
    fontWeight: 'bold',
  },
});
