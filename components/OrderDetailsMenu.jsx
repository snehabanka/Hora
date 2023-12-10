import * as React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const OrderDetailsMenu = ({ OrderDetailMenu }) => {
  console.log("orderdetailsmenu")
  const uniqueCurNames = new Set();
  // Populate the set with unique cur.name values
  const curNameCounts = {};
  OrderDetailMenu.forEach((item) => {
    Object.values(item.mealId).forEach((cur) => {
      uniqueCurNames.add(cur.name);
      const curName = cur.name;
      curNameCounts[curName] = (curNameCounts[curName] || 0) + 1;
    });
  });

  return (
    <View>
      <Text>testst</Text>
    </View>
    // <View style={styles.container}>
    //   <Text>"textt menu"</Text>
      
    //   {Array.from(uniqueCurNames).map((curName, curIndex) => (
    //     <View key={curIndex} style={styles.foodCatContainer}>
    //       <Text style={styles.foodCat}>{curName}  ({curNameCounts[curName]} dishes)</Text>
    //       <View style={styles.foodCatSec}>
    //         {OrderDetailMenu.map((item, itemIndex) => (
    //           <View key={itemIndex} style={styles.foodItem}>
    //               <View style={styles.imageContainer}>
    //             <Image
    //               source={require('../assets/daal.png')}
    //               style={styles.foodItemImage}
    //             />
    //             </View>
    //             <View style={styles.foodItemDetails}>
    //               <Text numberOfLines={10} ellipsizeMode="tail" style={styles.foodItemName}>
    //                 {item.name.length > 5 ? item.name.slice(0, 15) + '..' : item.name}
    //                 {/* {item.name} */}
    //               </Text>
    //               <Text style={styles.foodItemPrice}>₹ {item.price}</Text>
    //             </View>
    //           </View>
    //         ))}
    //       </View>
    //     </View>
    //   ))}



    // </View>
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
