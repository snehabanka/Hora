import * as React from 'react';
import { StyleSheet, Text, View, Image , Dimensions } from 'react-native';

const OrderDetailsIngre = ({ OrderMenu }) => {
  var OrderIngredients = [];
  OrderMenu.forEach((item) => {
    OrderIngredients.push(item);
  });
  return (
    <View style={{ paddingTop: 20, backgroundColor: "#fff", paddingTop: 20, paddingLeft: 20 }}>
      <View>
        <Text style={{ fontWeight: "600", color: "#000", fontSize: 16 }}>Required Ingredient</Text>
        <Text style={{ color: "#969696", fontSize: 11, fontWeight: "500" }}>(Keep these ingredient ready at your location)</Text>
      </View>
      <View>
        {OrderIngredients.map((item, index) => (
          <View key={index} style={styles.foodItem}>
            {console.log("OrderIngredients" + OrderIngredients)}
            <View style={styles.foodItemImageContainer}>
              <Image source={{ uri: `https://horaservices.com/api/uploads/${item.image}` }} style={styles.foodItemImage} />
            </View>
            <View style={styles.foodItemDetails}>
              <Text style={styles.foodItemName}>{item.name}</Text>
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
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginRight: 5, // Add margin between food items
    display: 'flex',
    borderWidth: 1,
    borderColor: '#ccc', // Specify the border color
    borderRadius: 10, // Add border radius for rounded corners
    width: windowWidth * 0.33,
    paddingTop: 10,
    paddingBottom: 10
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
