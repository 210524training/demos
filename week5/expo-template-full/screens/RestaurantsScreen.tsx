import * as React from 'react';
import { StyleSheet, Image, ScrollView, TouchableHighlight } from 'react-native';
import { Text, View } from '../components/Themed';
import Restaurant from '../models/restaurant';
import { generate as shortid } from 'shortid';
import { useNavigation } from '@react-navigation/native';

const prep = () => {
  const list = [
    new Restaurant(
      'Street Taco Shack',
      [
        { name: 'Naked Chicken Chalupa', price: 3.49 },
        { name: 'Cheesy Fiesta Potatoes', price: 1.69 },
        { name: 'Black Bean Chalupa', price: 3.29 },
        { name: 'Black Bean Crunchwrap', price: 3.89 },
        { name: 'Chalupa Supreme', price: 3.39 },
        { name: 'Cheesy Gordita Crunch', price: 3.69 },
        { name: 'Poqwe Menu Bowl', price: 5.69 },
        { name: 'Power Menu Bowl - Veggie', price: 5.59 },
        { name: 'Black Bean Quesarito', price: 3.29 },
        { name: 'Cheesy Roll Up', price: 1.00 },
        { name: 'Soft Taco Supreme', price: 1.89 },
        { name: 'Steak Quesadilla', price: 4.19 },
        { name: 'Qusarito', price: 3.39 },
        { name: 'Soft Taco', price: 1.39 },
        { name: 'Crunchy Taco', price: 1.39 },
        { name: 'Nacho Cheese Doritos', price: 1.89 },
        { name: 'Chicken Quesadilla', price: 3.89 },
        { name: 'Nachos', price: 3.89 },
      ],
      '1860 N Trade Days Blvd, Canton, TX 75103',
      4.7,
      [
        { day: 'Monday', open: 8, close: 6 },
        { day: 'Tuesday', open: 8, close: 6 },
        { day: 'Wednesday', open: 8, close: 6 },
        { day: 'Thursday', open: 8, close: 6 },
        { day: 'Friday', open: 8, close: 6 },
      ],
      'https://lh5.googleusercontent.com/p/AF1QipMQ-vAA9BqpzO5C1nZnpSHCyqfN3YsKn4AIlSEe=s387-k-no',
      'Texan',
      'Dine In',
      'cf4e1e0c-20ad-4e8d-87d9-5de7a6f09836',
    ),
  ];

  for (let i = 0; i < 10; i++) {
    list.push(list[0]);
  }
  return list;
}

export default function RestaurantsScreen() {
  const list = prep();
  const nav = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Restaurants</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.itemContainer}>
        {
          list.map((o) => (
            <TouchableHighlight key={shortid()}
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => {
                // nav.setParams(o);
                nav.navigate('Item View', {
                  restaurant: o,
                });
                // alert(o.name + shortid())
              }}
            >
              <View style={styles.item}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: o.img,
                  }}
                />

                <View>
                  <Text style={styles.name}>{o.name}</Text>
                  <Text
                    style={styles.subtitle}>
                    {o.rating} <Text style={{ color: '#d4af37' }}>{'★'.repeat(o.rating)}</Text> • {o.cuisine} • {o.type}
                  </Text>
                  <Text
                    style={styles.subtitle}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                  >
                    {o.location}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          ))
        }
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '100%',
    backgroundColor: 'white',

  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: 'red',
    width: '100%',
    padding: '5%',
    paddingTop: 50,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
    backgroundColor: 'white',
  },

  tinyLogo: {
    width: 75,
    height: 75,
    marginRight: 10,
  },

  itemContainer: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    width: '80%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {

  },
});

