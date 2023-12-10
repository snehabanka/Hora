import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const OrderDetailsAppli = ({ OrderDetailMenu }) => {
  console.log("orderdetailsappli")
  const uniqueCurNames = new Set();

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontWeight: "600" }}>Required Burners</Text>
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
              width: 40,
              marginLeft: 15,
              marginVertical: 46,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0
            }}
          />
          <Text style={{ color: "#9252AA", fontWeight: "600", fontSize: 24 }}>04</Text>
        </View>
      </View>
      <View>
        <Text style={{ fontWeight: "600" }}>Required Special  Appliances</Text>
        <Text style={{ color: "#969696", fontSize: 11, fontWeight: "500" , marginBottom:15}}>(Keep these appliances ready at your location)</Text>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {OrderDetailMenu.map((item, index) => (
            <View key={index}>
              {Object.values(item.special_appliance_id).map((cur, index1) => {
                // Check if cur.name is already displayed
                if (!uniqueCurNames.has(cur.name)) {
                  uniqueCurNames.add(cur.name); // Add to the Set to mark as displayed
                  return (
                    <View key={cur.name} style={styles.applicationsec}>
                      <View style={styles.applicationsecinner}>
                        <View style={styles.imageContainer}>
                          <Image source={require('../assets/cooking-pot.png')}
                            style={styles.appliItemImage} />
                        </View>
                        {/* <Image
                  source={{ uri: `https://horaservices.com/api/uploads/${cur.image}` }}
                  style={{ width: 41, height: 42, borderRadius: 20, marginBottom: 9, marginTop: 9, marginStart: 6 }}
                  /> */}
                        <Text numberOfLines={10} ellipsizeMode="tail" style={styles.appliItemName}>
                          {cur.name.length > 5 ? cur.name.slice(0, 12) + '..' : cur.name}
                        </Text>
                      </View>
                      <View style={styles.applicationsecinner}>
                        <View style={styles.imageContainer}>
                          <Image source={require('../assets/cooking-pot.png')}
                            style={styles.appliItemImage} />
                        </View>
                        {/* <Image
                  source={{ uri: `https://horaservices.com/api/uploads/${cur.image}` }}
                  style={{ width: 41, height: 42, borderRadius: 20, marginBottom: 9, marginTop: 9, marginStart: 6 }}
                  /> */}
                        <Text numberOfLines={10} ellipsizeMode="tail" style={styles.appliItemName}>
                          {cur.name.length > 5 ? cur.name.slice(0, 12) + '..' : cur.name}
                        </Text>
                      </View>
                      <View style={styles.applicationsecinner}>
                        <View style={styles.imageContainer}>
                          <Image source={require('../assets/cooking-pot.png')}
                            style={styles.appliItemImage} />
                        </View>
                        {/* <Image
                  source={{ uri: `https://horaservices.com/api/uploads/${cur.image}` }}
                  style={{ width: 41, height: 42, borderRadius: 20, marginBottom: 9, marginTop: 9, marginStart: 6 }}
                  /> */}
                        {/* <Text style={styles.appliItemName}>{cur.name}</Text> */}
                        <Text numberOfLines={10} ellipsizeMode="tail" style={styles.appliItemName}>
                          {cur.name.length > 5 ? cur.name.slice(0, 12) + '..' : cur.name}
                        </Text>
                      </View>


                    </View>
                  );
                }
                return null; // Don't render if already displayed
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15
  },
  applicationsec: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  applicationsecinner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(184, 184, 184, 1)',
    borderRadius: 5,
    paddingTop: 4,
    paddingBottom: 8,
    paddingLeft: 4,
    paddingRight: 10,
    color: 'rgba(65, 65, 65, 1)',
    maxHeight: 65,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5, // Add margin between foodItem elements
    marginRight: 5, // Add margin between foodItem elements
    maxWidth: '31.3%', // Limit each foodItem to occupy a maximum of 30% of the container width
  },
  imageContainer: {
    backgroundColor: '#EAEAEA', // Grey background color
    paddingVertical: 5,
    paddingLeft: 4,
    marginLeft: 6,
    marginRight: 6
  },
  appliItemImage: {
    height: 27,
    width: 27,
    resizeMode: 'contain', // Ensure that the image fits within its container
    marginRight: 4,
  },
  appliItemName: {
    flex: 1,
    marginRight: 8,
    fontSize: 11,
    textAlign: "right",
    marginRight: 0,
    fontWeight: "600"
  }

})

export default OrderDetailsAppli;
