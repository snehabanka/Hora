import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const CarouselComponent = ({ data, reviewData }) => {
  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      {reviewData ? (
        <Image source={item.image} style={styles.image1} />
      ) : (
        <Image source={item.image} style={styles.image} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width - 15}
        loop={true}
        autoplay={true}
        autoplayInterval={1000}
        paginationStyle={styles.paginationStyle}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  carouselItem: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 158,
  },
  image1: {
    width: '100%',
    height: 300,
  },
  paginationStyle: {
    bottom: 30, // Adjust this value to position the pagination dots as per your design
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9252AA', // Active dot color
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#CFCFCF', // Inactive dot color
  },
});

export default CarouselComponent;
