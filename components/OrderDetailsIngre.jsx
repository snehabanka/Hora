import * as React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

const OrderDetailsIngre = () => (
  <View style={styles.container}>
    <View>
      <Text style={{ fontWeight: "600" }}>Required Ingredient</Text>
      <Text style={{ color: "#969696" }}>(Keep these ingredient ready at your location)</Text>
      <View style={styles.ingregrid}>
        <View style={styles.ingregridsec}>
          <View style={styles.ingregrimg}>
            <Image source={require('../assets/potato.png')} style={{
              height: 30,
              width: 30,
              marginLeft: 15,
              marginVertical: 46,
              marginLeft: 0,
              marginTop: 0,
              marginBottom: 0
            }} />
          </View>
          <View>
            <Text>Potato</Text>
            <Text style={{ color: "#9252AA" }}>1KG</Text>
          </View>
        </View>
        <View style={styles.ingregridsec}>
          <View style={styles.ingregrimg}>
            <Image source={require('../assets/potato.png')} style={{
              height: 30,
              width: 30,
              marginLeft: 15,
              marginVertical: 46,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0
            }} />
          </View>
          <View>
            <Text>Potato</Text>
            <Text style={{ color: "#9252AA" }}>1KG</Text>
          </View>
        </View>
        <View style={styles.ingregridsec}>
          <View style={styles.ingregrimg}>
            <Image source={require('../assets/potato.png')} style={{
              height: 30,
              width: 30,
              marginLeft: 15,
              marginVertical: 46,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0
            }} />
          </View>
          <View>
            <Text>Potato</Text>
            <Text style={{ color: "#9252AA" }}>1KG</Text>
          </View>
        </View>
        <View style={styles.ingregridsec}>
          <View style={styles.ingregrimg}>
            <Image source={require('../assets/potato.png')} style={{
              height: 30,
              width: 30,
              marginLeft: 15,
              marginVertical: 46,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0
            }} />
          </View>
          <View>
            <Text>Potato</Text>
            <Text style={{ color: "#9252AA" }}>1KG</Text>
          </View>
        </View>
        <View style={styles.ingregridsec}>
          <View style={styles.ingregrimg}>
            <Image source={require('../assets/potato.png')} style={{
              height: 30,
              width: 30,
              marginLeft: 15,
              marginVertical: 46,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0
            }} />
          </View>
          <View>
            <Text>Potato</Text>
            <Text style={{ color: "#9252AA" }}>1KG</Text>
          </View>
        </View>
        <View style={styles.ingregridsec}>
          <View style={styles.ingregrimg}>
            <Image source={require('../assets/potato.png')} style={{
              height: 30,
              width: 30,
              marginLeft: 15,
              marginVertical: 46,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0
            }} />
          </View>
          <View>
            <Text>Potato</Text>
            <Text style={{ color: "#9252AA" }}>1KG</Text>
          </View>
        </View>
        <View style={styles.ingregridsec}>
          <View style={styles.ingregrimg}>
            <Image source={require('../assets/potato.png')} style={{
              height: 30,
              width: 30,
              marginLeft: 15,
              marginVertical: 46,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0
            }} />
          </View>
          <View>
            <Text>Potato</Text>
            <Text style={{ color: "#9252AA" }}>1KG</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);



const styles = StyleSheet.create({
  container: {
    flex: "1",
    backgroundColor: "#fff",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "15px"
  },
  ingregrid: {
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "10px"
  },
  ingregridsec: {
    border: "1px solid #B8B8B8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    border: "1px solid rgb(184, 184, 184)",
    borderRadius: "10px",
    paddingBottom: "7px",
    paddingTop: "7px",
    paddingLeft: "7px",
    paddingRight: "13px",
    marginRight: "8px",
    marginTop: "8px"
  },
  ingregrimg: {
    backgroundColor: "#F0F0F0",
    paddingTop: "7px",
    paddingLeft: "7px",
    paddingRight: "7px",
    paddingBottom: "7px",
    marginRight: "6px"
  }
})


export default OrderDetailsIngre;
