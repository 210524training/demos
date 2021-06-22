import * as React from 'react';
import { StyleSheet, Image, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import Restaurant from '../models/restaurant';

export default function RestaurantsScreen() {
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View>
        {
          list.map((o) => (
            <View style={{}} key={o.name + o.id}>
              <Text>                              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{flex:1}}>
                      <Text>{o.name}</Text>
                      <Text>{o.rating}</Text>
                  </View>
                  <View style={{flex:1}}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: o.img,
                      }}
                    /> 
                  </View>
              </View>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </View>
          ))
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  tinyLogo: {
    width: 50,
    height: 50,

  },

});
