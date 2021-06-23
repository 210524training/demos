import React, { useState } from 'react';
import { StyleSheet, Image, ScrollView, TextInput, Button, Dimensions } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import iphone from '../assets/images/iphone.png';
import scooter from '../assets/images/scooter.png';
import storefront from '../assets/images/storefront.png';
import { ImageSourcePropType } from 'react-native';
import { useAppSelector } from '../hooks';
import { selectUser, UserState } from '../hooks/slices/user.slice';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';

const dims = Dimensions.get('window');

export default function TabOneScreen() {
  const [text, setText] = useState('');
  const user = useAppSelector<UserState>(selectUser);
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.head}>
        <Text style={styles.title}>{user ? `Hello, ${user.username}!` : 'GrubDash'}</Text>
        <Text style={styles.subtitle}>Restaurants and more, delivered to your door</Text>
        <TextInput
          style={styles.search}
          placeholder="Your Address"
          onChangeText={text => setText(text)}
          defaultValue={text}
        />
      </View>


      <View style={styles.container}>
        {icon(scooter, 'Become a Dasher')}
        {icon(iphone, 'Try the App')}
        {icon(storefront, 'View Restaurants')}
      </View>



    </ScrollView>
  );
}

const icon = (img: ImageSourcePropType, txt: string) => {
  return (
    <View style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Image
        source={img}
        style={styles.img}
      />
      <Text style={styles.imgText}>{txt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    backgroundColor: 'red',
    width: '100%',
    padding: '5%',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  search: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'white',
    width: '100%',
    // textAlign: 'center',
    color: 'black',
    borderRadius: 20,
    margin: 10,
    paddingLeft: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  img: {
    width: 100,
    height: 100,
  },
  imgText: {
    textAlign: 'center',
  },
  button: {
    color: '#f194ff',
  },
});
