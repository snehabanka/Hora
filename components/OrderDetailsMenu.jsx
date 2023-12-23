import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const OrderDetailsMenu = ({ OrderMenu }) => {

  console.log("orderdetailsmenu", OrderMenu);
  var Appetizer = [];
  OrderMenu.forEach((item) => {
    if (item.mealId[0].name === 'Appetizer') {
      Appetizer.push({ name: item.name, image: item.image, price: item.price });
    }
  });
  console.log("Appetizer", Appetizer);


  return (
    <View>
      {Appetizer.length > 0 && (
        <View style={styles.foodItemsContainer}>
          <View>
            <Text style={styles.menuCat}>{'Appetizer'} {"(" + Appetizer.length + ")"}</Text>
          </View>
          <View>
            {Appetizer.map((item, index) => (

              <View key={index} style={styles.foodItem}>
                <View style={styles.foodItemImageContainer}>
                  <Image source={{ uri: `https://horaservices.com/api/uploads/${item.image}` }} style={styles.foodItemImage} />
                </View>
                <View style={styles.foodItemDetails}>
                  <Text style={styles.foodItemName}>{item.name}</Text>
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
    paddingLeft:20,
  },
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

export default OrderDetailsMenu;
