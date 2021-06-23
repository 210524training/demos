import * as React from 'react';
import { Button, StyleSheet, Image, TextInput, Text, View, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';

 const scooter = require('../assets/images/scooter2.png');
 const iphone = require('../assets/images/phone2.png');
 const storefront = require('../assets/images/storefront.png');

export default function TabOneScreen() {

  
  return (
    <ScrollView>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>{"\n"}Delivered to your door!{"\n"}</Text>
        <TextInput style={styles.input1} placeholder="Your Address"/>
        <Button title="Search" onPress={() => {}}/>
      </View>
      
      <View style={styles.container}>
        <View style={styles.imgbox}>
          <Image source={scooter} style={styles.image1} />
          <Text style={styles.imageLabel}>Become a Dasher{"\n"}</Text>
        </View>
        <View style={styles.imgbox}>
          <Image source={iphone} style={styles.image1}/>
          <Text style={styles.imageLabel}>Try the app{"\n"}</Text>
        </View>      
        <View style={styles.imgbox}>
          <Image source={storefront} style={styles.image1}/>
          <Text style={styles.imageLabel}>View Restaurants{"\n"}</Text>
        </View>
      </View>

      <Text>
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerText: {
    color: "#262633",
    fontWeight: "900",
    fontSize: 20,
  },
  imageLabel: {
    color: "#262633",
  },
  input1: {
    // height: "20px",
    // padding: "10px",
    backgroundColor: "white",
    textAlign: 'center',
    width: "70%",
    borderRadius: 25,
    color: "black",
    marginBottom: 12,
    // marginRight: "-70px",
  },
  banner: {
    backgroundColor: "#a1becc",
    alignItems: 'center',
    width: "100%",
    height: "23%",
    // padding: "8em",
    // marginBottom: "60px",
  },
  image1: {
    // marginLeft: "auto",
    // marginRight: "auto",
    width: 150,
    height: 150,
    // marginTop: 50,
    resizeMode: 'contain',
  },
  imgbox: {
    width: "50%",
    alignItems: "center",
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});
