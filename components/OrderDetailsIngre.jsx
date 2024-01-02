import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { BASE_URL, ORDER_INGREDIENTS } from '../utils/ApiConstants';

const OrderDetailsIngre = () => {
  const [orderIngredients, setOrderIngredients] = useState({});
  async function fetchOrderIngredients() {
    try {
      const response = await fetch(BASE_URL + ORDER_INGREDIENTS + '/252');
      const responseData = await response.json();
      setOrderIngredients(responseData.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrderIngredients();
  }, []);
  return (
    <View style={{ paddingTop: 20, backgroundColor: "#fff", paddingTop: 20, paddingLeft: 10 , paadingRight:20 }}>
      <View>
        <Text style={{ fontWeight: "600", color: "#000", fontSize: 16 }}>Required Ingredient</Text>
        <Text style={{ color: "#969696", fontSize: 11, fontWeight: "500" }}>(Keep these ingredient ready at your location)</Text>
      </View>
      <View style={styles.foodItemsSecContainer}>
        {Object.keys(orderIngredients).map((item, index) => (
          <View key={index} style={styles.foodItem}>
            <View style={styles.foodItemImageContainer}>
              <Image source={{ uri: `https://horaservices.com/api/uploads/${item.image}` }} style={styles.foodItemImage} />
            </View>
            <View style={styles.foodItemDetails}>
              <Text style={styles.foodItemName}>{item}</Text>
              <Text>{item.qty}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  foodItemsSecContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom:20,
    flexWrap: 'wrap', // Allow items to wrap into the next row
  },
  foodItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginRight: 3, // Add margin between food items
    borderWidth: 1,
    borderColor: '#ccc', // Specify the border color
    borderRadius: 10, // Add border radius for rounded corners
    width: '31%', // Adjust width based on available space
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight:5,
    paddingLeft:5,
    minHeight:70,
  },
  foodItemImageContainer: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  foodItemImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  foodItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  foodItemName: {
    fontSize: 12,
    color: '#333',
  },
});

export default OrderDetailsIngre;
