import * as React from 'react';
import { StyleSheet, Text, View, Image , Dimensions} from 'react-native';

const OrderDetailsAppli = ({ OrderAppl }) => {
  return (
    <View style={{ paddingTop: 20 , backgroundColor:"#fff" , paddingTop:20, paddingLeft:20 }}>
      <View>
        <Text style={{ fontWeight: "600", color: "#000", fontSize: 16 }}>Required Burners</Text>
        <Text style={{ color: "#969696", fontSize: 11, fontWeight: "500" }}>(Burners would be used at your location)</Text>
        <View style={{
          flexDirection: 'row',
          display: "flex",
          borderWidth: 1,
          borderColor: ' #969696',
          borderRadius: 6,
          width: "34%",
          paddingVertical: 10,
          paddingHorizontal: 9,
          justifyContent: 'space-between',
          alignItems: "center",
          marginHorizontal: 0,
          marginVertical: 20
        }}>
          <Image
            source={require('../assets/burner.png')}
            style={{
              height: 15,
              width: 70,
              marginLeft: 15,
              marginVertical: 46,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0
            }}
          />
          <Text style={{ color: "#9252AA", fontWeight: "600", fontSize: 20 }}>04</Text>
        </View>
      </View>
      <View>
        <View>
          <Text style={{ fontWeight: "600", color: "#000", fontSize: 16 }}>{'Requires Special Appliances'}</Text>
          <Text style={{ color: "#969696", fontSize: 11, fontWeight: "500" }}>{'(Keep these appliances ready at your location)'}</Text>
        </View>
        <View style={styles.foodItemsContainer}>
          {OrderAppl.map((item, index) => (
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
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
    width: windowWidth * 0.5,
    paddingTop: 10,
    paddingBottom: 10
  },
  foodItemImageContainer: {
    width: 100,
    height: 60,
    borderRadius: 10,
  },
  foodItemImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  foodItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  foodItemName: {
    fontSize: 12,
    color: '#333',
  },
})

export default OrderDetailsAppli;
