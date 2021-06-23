import React, { useState } from 'react';
import { Text, View } from '../components/Themed';
import { useAppSelector } from '../hooks';
import { selectUser, UserState } from '../hooks/slices/user.slice';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Image, ScrollView, TextInput, Button, Dimensions } from 'react-native';

const ItemViewScreen = ({ route }) => {
  const nav = useNavigation();
  const user = useAppSelector<UserState>(selectUser);
  const r = route.params.restaurant; 
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Text style={[styles.text, {textAlign: 'left'}]}>
            <Button 
            title="Back"
            onPress={() => {
              nav.goBack();
            }}
            ></Button>
          </Text>
        </View>
        <Text style={styles.text}>
          {r.name}
        </Text>
        <View style={styles.rightContainer}>
          <View style={styles.rightIcon}/>
        </View>
      </View>
      {/* <View style={styles.head}>
        <Text style={styles.title}>{r.name}</Text>
      </View>


      <View style={styles.container}>
        <Text style={styles.subtitle}>{r.location}</Text>
        <Text style={styles.subtitle}>{r.rating}</Text>
        <Text style={styles.subtitle}>{r.cuisine}</Text>
        <Text style={styles.subtitle}>{r.type}</Text>
      </View> */}



    </ScrollView>
  );
}

//https://stackoverflow.com/a/36010239
const styles = StyleSheet.create({
  navBar: {
    paddingTop: 50,
    // height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'red'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});


export default ItemViewScreen;