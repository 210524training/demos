import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

type Props = {
  source: ImageSourcePropType,
  description: string,
}

const GridItem: React.FC<Props> = (props) => {
  return (
    <>
      <View style={styles.gridItem}>
        <Image source={props.source} style={styles.image1} />
        <Text style={styles.label}>{props.description} </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image1: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  gridItem: {
    backgroundColor: '#a1becc',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 3,
  },
  label: {
    fontWeight: "600",
    fontSize: 20,
    color: "#262633",
    fontFamily: ""
  }
});

export default GridItem; 