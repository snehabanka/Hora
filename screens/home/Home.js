import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight ,Pressable, Image, BackHandler, TouchableOpacity, ScrollView } from 'react-native';
import CarouselComponent from '../dialog/CarouselComponent';
import CustomHeader from '../../components/CustomeHeader';
import Geolocation from '@react-native-community/geolocation';
import CreateOrder from '../createorder/CreateOrder';

const Home = ({ navigation }) => {
  const [decCat, setDecCat] = useState([
    { image: require('../../assets/Birthday_dec_cat.jpg'), name: 'Birthday' },
    { image: require('../../assets/first_night_cat_dec.jpg'), name: 'First Night' },
    { image: require('../../assets/aniversary_Cat_Dec.jpg'), name: 'Anniversary' },
    { image: require('../../assets/kids_birthday_decoration.jpg'), name: 'Kids Birthday' },
    { image: require('../../assets/baby-shower-dec-cat.jpg'), name: 'Baby Shower' },
    { image: require('../../assets/welcome_baby_dec.jpg'), name: 'Welcome Baby' },
  ]);

  const openCatItems = (category) => {
    // const categoryNameWithDashes = category.name.replace(/\s+/g, '-');
    navigation.navigate('DecorationCatCollection', { category });

  };

  const [currentAddress, setCurrentAddress] = useState(null);

  const bookNowData = [
    { id: '1', image: require('../../assets/home-slider.png') },
    { id: '2', image: require('../../assets/home-slider.png') },
    { id: '3', image: require('../../assets/home-slider.png') }
  ];

  const popularDishes = [
    { id: '1', image: require('../../assets/homeslider2-firstimg.png') },
    { id: '2', image: require('../../assets/homeslider2-secondimg.png') },
    { id: '3', image: require('../../assets/homeslider2-thirdimg.png') }
  ];



  const desertsData = [
    { id: '1', image: require('../../assets/burner.png') },
    { id: '2', image: require('../../assets/burner.png') },
    { id: '3', image: require('../../assets/burner.png') }
  ];

  const reviewData = [
    { id: '1', image: require('../../assets/happycustomers.png') },
    { id: '2', image: require('../../assets/happycustomers.png') },
    { id: '3', image: require('../../assets/happycustomers.png') }
  ];

  const openCreateOrder = () => {
    navigation.navigate('CreateOrder');
  }

  return (
    <ScrollView style={styles.container}>
      <CustomHeader title={"Home"} navigation={navigation} />
      <CarouselComponent data={bookNowData} />
      <View style={{ marginStart: 16, marginTop: 16 }}>
        <Text>
          <Text style={styles.normalText}>Book Your  </Text>
          <Text style={styles.dishesText}>Decoration</Text>
        </Text>
      </View>
      <View style={styles.decContainer}>
        {decCat.map(({ image, name }, index) => (
          <Pressable key={index} onPress={() => openCatItems(name)} style={styles.decImageContainer}>
            <Image source={image} style={styles.decCatimage} />
          </Pressable>
        ))}
      </View>

      {/* celebrate section */}
      <View>
        <Image
          source={require('../../assets/celebrate.png')}
          style={{ height: 496, width: Dimensions.get('window').width, marginTop: 10 }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.customButton} activeOpacity={1} onPress={openCreateOrder}>
            <Text style={styles.buttonText}> Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* happy customers */}
      <View style={{ marginTop: 30  , marginBottom:40}}>
        <CarouselComponent data={reviewData} reviewData={reviewData} />
      </View>

      {/* popular dishes section */}
      {/* <View style={{ marginStart: 16, marginTop: 16 }}>
        <Text>
          <Text style={styles.normalText}>Most Popular </Text>
          <Text style={styles.dishesText}>Dishes</Text>
        </Text>
      </View> */}
      {/* <CarouselComponent data={popularDishes} /> */}
      <View>
      </View>

      {/* why hora */}
     
      <TouchableHighlight onPress={openCreateOrder}>
      <Image
        source={require('../../assets/whyHora.png')}
        style={{
          height: 500,
          width: Dimensions.get('window').width - 1,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    </TouchableHighlight>
        
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  normalText: { color: '#323643', fontSize: 14, fontWeight: '600' },
  dishesText: { color: '#9252AA', fontSize: 14, fontWeight: '600' },
  customButton: {
    height: 34,
    width: 138,
    marginTop: 10,
    backgroundColor: '#9252AA',
    marginHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  decContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  decImageContainer: {
    width: '30%', // Adjust as needed
    aspectRatio: 1, // Maintain the aspect ratio of the images
    marginBottom: 10,
  },
  decCatimage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default Home;

