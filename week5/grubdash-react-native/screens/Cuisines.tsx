import React from 'react';
import { Button, StyleSheet, Image, TextInput, Text, View, ScrollView, NativeSyntheticEvent, NativeTouchEvent,  } from 'react-native';
import GridItem from '../components/GridItem';

const burger = require('../assets/images/burger.png');
const mexican = require('../assets/images/taco.png');
const chinese = require('../assets/images/chinese.png');
const italian = require('../assets/images/spaghetti.png');
const sushi = require('../assets/images/sushi.png');

type Props = {

}

const Restaurants: React.FC<Props> = (props) => {

  return (
      <ScrollView style={styles.container}>
        <View>
          <GridItem source={burger} description="American"/>
          <GridItem source={italian} description="Italian"/>
          <GridItem source={mexican} description="Mexican"/>
          <GridItem source={chinese} description="Chinese"/>
          <GridItem source={sushi} description="Asian"/>
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
  },
  formLabel: {
    color: "#262633",
  },
  bannerText: {
    color: "#262633",
    fontWeight: "900",
    fontSize: 20,
    textAlign: 'center',
  },
  inputBox: {
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginBottom: 15,
  },
});

export default Restaurants;