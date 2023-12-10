import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const OrderDetailsIngre = ({ OrderDetailMenu }) => {
  console.log("orderdetailsingre")
  const uniqueNames = new Set();

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "600" }}>Required Ingredient</Text>
      <Text style={{ color: "#969696", marginBottom: 15 }}>(Keep these ingredients ready at your location)</Text>
      {OrderDetailMenu.map((item, index) => (
        <View key={index} style={styles.foodItemContainerinner}>
          {Object.values(item.ingredientUsed).map((cur, index1) => {
            // Check if cur.name is already in the set
            if (!uniqueNames.has(cur.name)) {
              uniqueNames.add(cur.name); // Add to the set to mark as displayed
              return (
                <View key={index1} style={styles.foodItemInner}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: `https://horaservices.com/api/uploads/${cur.image}` }}
                      style={styles.foodItemImage}
                    />
                  </View>
                  <View style={styles.foodDetails}>
                    <Text numberOfLines={10} ellipsizeMode="tail" style={styles.foodItemName}>
                      {cur.name.length > 5 ? cur.name.slice(0, 10) + '..' : cur.name}
                    </Text>
                    <Text style={styles.foodQuantity}>{'1KG'}</Text>
                  </View>
                </View>
              );
            }
            return null; // Don't render if already displayed
          })}
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  foodItemContainerinner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    // backgroundColor: '#EAEAEA', // Grey background color
    paddingVertical: 5,
    paddingleft:4,
    marginLeft:6,
    marginRight:6
  },
  foodItemInner: {
    alignItems: 'center', // Align items to the start (left)
    borderWidth: 1,
    borderColor: 'rgba(184, 184, 184, 1)',
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom:8,
    paddingRight:4,
    paddingLeft:0,
    marginBottom: 8,
    flexDirection: 'row', // Display children in a row
    justifyContent: 'space-between',
     width: '32%', // Space between image and food details
    height: 61
  },
  foodItemImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
     marginRight:6
  },
  foodDetails: {
    flex: 1, // Allow details to occupy remaining space
    flexDirection: 'column', // Display name and quantity in a column
    alignItems: 'flex-start', // Align items to the end (right)
  },
  foodItemName: {
    fontWeight: 'bold', 
    fontSize:11,
    textAlign:'left',
    lineHeight:13,
    color:"#414141",
    minHeight:15
  },
  foodQuantity: {
    color: "#9252AA",
    fontSize:16,
    fontWeight:"700"
  },
});

export default OrderDetailsIngre;
