import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const OrderDetailsMenu = ({ OrderMenu }) => {
  var Appetizer = [];
  OrderMenu.forEach((item) => {
    if (item.mealId[0].name === 'Appetizer') {
      Appetizer.push({ name: item.name, image: item.image, price: item.price });
    }
  });
  return (
    <View>
      {Appetizer.length > 0 && (
        <View style={styles.foodItemsContainer}>
          <View>
            <Text style={styles.menuCat}>{'Appetizer'} {"(" + Appetizer.length + ")"}</Text>
          </View>
          <View style={styles.foodItemsSecContainer}>
            {Appetizer.map((item, index) => (
              <View key={index} style={styles.foodItem}>
                <View style={styles.foodItemImageContainer}>
                  <Image source={{ uri: `https://horaservices.com/api/uploads/${item.image}` }} style={styles.foodItemImage} />
                </View>
                <View style={styles.foodItemDetails}>
                <Text style={styles.foodItemName}>{item.name.length > 14 ? `${item.name.substring(0, 16)}...` : item.name}</Text>

                </View>
              </View>
            ))}
          </View>

        </View>
      )}
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  menuCat: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  },
  foodItemsContainer:{
    backgroundColor:"#fff",
    paddingTop:20,
    paddingLeft:10,
    paddingRight:10,
  },
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
    width: '32%', // Adjust width based on available space
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight:5,
    paddingLeft:5,
    minHeight:70,
  },
  foodItemImageContainer: {
    width: 40,
    height: 35,
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

export default OrderDetailsMenu;
