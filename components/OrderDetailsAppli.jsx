import * as React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

const OrderDetailsAppli = () => (
  <View style={styles.container}>
    <View>
      <View>
        <Text style={{ fontWeight: "600" }}>Required Burners</Text>
        <Text>(Burners would be used at your location)</Text>
        <View>
          <span>
            <Image source={require('../assets/cooking-pot.png')} style={{
              height: 13,
              width: 13,
              marginLeft: 15,
              marginVertical: 46,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0
            }} /></span>
          <span>
            <Text>Idly Stand</Text>
          </span>
        </View>
      </View>
      <View>
      <Text style={{ fontWeight: "600" }}>Required Special  Appliances</Text>
        <Text>(Keep these appliances ready at your location)</Text>
        <ul>
          <li>
            <span>
              <Image source={require('../assets/cooking-pot.png')} style={{
                height: 13,
                width: 13,
                marginLeft: 15,
                marginVertical: 46,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
              }} /></span>
            <span>
              <Text>Idly Stand</Text>
            </span>
          </li>
          <li>
            <span>
              <Image source={require('../assets/cooking-pot.png')} style={{
                height: 13,
                width: 13,
                marginLeft: 15,
                marginVertical: 46,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
              }} /></span>
            <span>
              <Text>Charcol Burner</Text>
            </span>
          </li>
          <li>
            <span>
              <Image source={require('../assets/cooking-pot.png')} style={{
                height: 13,
                width: 13,
                marginLeft: 15,
                marginVertical: 46,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
              }} /></span>
            <span>
              <Text>Charcol Burner</Text>
            </span>
          </li>
          <li>
            <span>
              <Image source={require('../assets/cooking-pot.png')} style={{
                height: 13,
                width: 13,
                marginLeft: 15,
                marginVertical: 46,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
              }} /></span>
            <span>
              <Text>Charcol Burner</Text>
            </span>
          </li>
          <li>
            <span>
              <Image source={require('../assets/cooking-pot.png')} style={{
                height: 13,
                width: 13,
                marginLeft: 15,
                marginVertical: 46,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
              }} /></span>
            <span>
              <Text>Charcol Burner</Text>
            </span>
          </li>
        </ul>
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
  }
})



export default OrderDetailsAppli;
