import React from 'react';
import { StyleSheet, View, ScrollView, Pressable, ImageSourcePropType, Platform, TouchableNativeFeedback } from 'react-native';
import GridItem from '../components/GridItem';

import burger from '../assets/images/burger.png';
import mexican from '../assets/images/taco.png';
import chinese from '../assets/images/chinese.png';
import italian from '../assets/images/spaghetti.png';
import sushi from '../assets/images/sushi.png';
import { useNavigation } from '@react-navigation/native';

type Props = {

}

export type Cuisine = [ImageSourcePropType, string];

const CuisineScreen: React.FC<Props> = (props) => {

  const nav = useNavigation();

  const cuisines: Cuisine[] = [
    [burger, 'American'],
    [italian, 'Italian'],
    [mexican, 'Mexican'],
    [chinese, 'Chinese'],
    [sushi, 'Asian']
  ];

  const cuisineJSX = () => {
    return cuisines.map(cuisine => (
      <Pressable onPress={() => handlePress(cuisine)}>
        <GridItem source={cuisine[0]} description={cuisine[1]} />
      </Pressable>
      ));
  }

  const androidJSX = () => {
    return cuisines.map(cuisine => (
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => handlePress(cuisine)}>

        <GridItem source={cuisine[0]} description={cuisine[1]} />
      </TouchableNativeFeedback>
      ));
  }

  const handlePress = (cuisine: Cuisine) => {
    nav.navigate('RestaurantsScreen', {
      cuisine,
    });
  }

  return (
      <ScrollView style={styles.container}>
        <View>
          {
            Platform.OS === 'android' ? 
            cuisineJSX() : cuisineJSX()
          }
        </View>
      </ScrollView>
  );
};

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: "white",
  }
});

export default CuisineScreen;