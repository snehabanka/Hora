import * as React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const OrderDetailsMenu = ({ OrderDetailMenu }) => {
  //console.log("orderdetailsmenu" , OrderDetailMenu)
  var Appetizer = [];
  OrderDetailMenu.forEach((item) => {
    if(item.mealId[0].name == 'Appetizer'){
      Appetizer.push(item.name)
    }
  });
  console.log("Appetizer" + Appetizer);

  return (
      <View>
        {console.log("aaa")}
        {Appetizer.map((item, index) => (
          <Text key={index} >{console.log(item)}{'inside app'}</Text>
        ))}
      </View>
  );
};

const styles = StyleSheet.create({
  container:{
    height:500,
    width:Dimensions.get('window').width*0.5
  },
  imageContainer: {
    backgroundColor: '#EAEAEA', // Grey background color
    paddingVertical: 5,
    paddingLeft:4,
    marginLeft:6,
    marginRight:6
  },
  foodCatContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column', // Display foodCat and foodCatSec in a column
    marginTop: 0,
    backgroundColor:"#fff",
    paddingHorizontal:5
  },
  foodCat: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom:15,
    marginTop:13,
    paddingLeft:6
  },
  foodCatSec: {
    display: 'flex',
    flexDirection: 'row', // Display foodItem elements in a row
    flexWrap: 'wrap', // Allow foodItem elements to wrap to the next row
    justifyContent: 'space-between',
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(184, 184, 184, 1)',
    borderRadius: 18,
    paddingTop: 4,
    paddingBottom: 8,
    paddingLeft: 0,
    paddingRight: 10,
    color: 'rgba(65, 65, 65, 1)',
    maxHeight:55,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5, // Add margin between foodItem elements
    marginRight: 5, // Add margin between foodItem elements
    maxWidth: '31.3%', // Limit each foodItem to occupy a maximum of 30% of the container width
  },
  foodItemImage: {
    height: 27,
    width: 27,
    resizeMode: 'contain', // Ensure that the image fits within its container
    marginRight: 4,
  },
  foodItemDetails: {
    flex: 1, // Allow details to occupy remaining space
  },
  foodItemName: {
    flex: 1,
    marginRight: 8,
    fontSize:11,
    textAlign:"right",
    marginRight:0,
    fontWeight:"600"
  },
  foodItemPrice: {
    color: 'rgba(146, 82, 170, 1)',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: "600",
  },
});

export default OrderDetailsMenu;
