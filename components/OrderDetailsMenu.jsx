import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';


const OrderDetailsMenu = ({ OrderDetail }) => {
  // console.log(JSON.stringify(OrderDetail.selecteditems))
   const selectItems = OrderDetail.selecteditems

  //  selectItems.forEach((index)=>{
  //   console.log(index)
  //  })
  

  // useEffect(() => {
  //   itemkey.map((item) => {
  //     return (
  //       <View>
  //         {item}
  //       </View>
  //     )
  //   })
  // }, [itemkey])


  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingLeft: "15px", paddingRight: "15px" }}>


      {/* {
        selectItems.map((item)=>{
          return(
            <View>
              {item}
              </View>
          )
        })
      } */}
      <View>
        <Text style={{ fontSize: "16px", fontWeight: "600", paddingTop: "10px", paddingBottom: "0px" }}>Appetizer(20)</Text>
        <ul style={styles.ulclass}>
          <li style={styles.liclass}>
            <View>
              <Image source={require('../assets/daal.png')} style={{
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
              <View><Text style={{ color: "#414141", fontWeight: "600", textAlign: "right", fontSize: "12px" }}>Daal Tadka </Text></View>
              <View><Text style={{ color: "#9252AA", fontWeight: "600", textAlign: "right" }}>"₹" 199</Text></View>
            </View>
          </li>
          <li style={styles.liclass}>
            <span>
              <Image source={require('../assets/daal.png')} style={{
                height: 30,
                width: 30,
                marginLeft: 15,
                marginVertical: 46,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
            </span>
            <span>
              <View><Text style={{ color: '#414141', fontSize: "12px", fontWeight: "600" }}>Daal Tadka </Text></View>
              <View><Text style={{ color: "#9252AA", fontWeight: "600", textAlign: "right" }}>"₹" 199</Text></View>
            </span>
          </li>
          <li style={styles.liclass}>
            <span>
              <Image source={require('../assets/daal.png')} style={{
                height: 30,
                width: 30,
                marginLeft: 15,
                marginVertical: 46,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
            </span>
            <span>
              <View><Text style={{ color: '#414141', fontSize: "12px", fontWeight: "600" }}>Daal Tadka </Text></View>
              <View><Text style={{ color: "#9252AA", fontWeight: "600", textAlign: "right" }}>"₹" 199</Text></View>
            </span>
          </li>
          <li style={styles.liclass}>
            <span>
              <Image source={require('../assets/daal.png')} style={{
                height: 30,
                width: 30,
                marginLeft: 15,
                marginVertical: 46,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
            </span>
            <span>
              <View><Text style={{ color: '#414141', fontSize: "12px", fontWeight: "600" }}>Daal Tadka </Text></View>
              <View><Text style={{ color: "#9252AA", fontWeight: "600", textAlign: "right" }}>"₹" 199</Text></View>
            </span>
          </li>
          <li style={styles.liclass}>
            <span>
              <Image source={require('../assets/daal.png')} style={{
                height: 30,
                width: 30,
                marginLeft: 15,
                marginVertical: 46,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
            </span>
            <span>
              <View><Text style={{ color: '#414141', fontSize: "12px", fontWeight: "600" }}>Daal Tadka </Text></View>
              <View><Text style={{ color: "#9252AA", fontWeight: "600", textAlign: "right" }}>"₹" 199</Text></View>
            </span>
          </li>
          <li style={styles.liclass}>
            <span>
              <Image source={require('../assets/daal.png')} style={{
                height: 30,
                width: 30,
                marginLeft: 15,
                marginVertical: 46,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
            </span>
            <span>
              <View><Text style={{ color: '#414141', fontSize: "12px", fontWeight: "600" }}>Daal Tadka </Text></View>
              <View><Text style={{ color: "#9252AA", fontWeight: "600", textAlign: "right" }}>"₹" 199</Text></View>
            </span>
          </li>
          <li style={styles.liclass}>
            <span>
              <Image source={require('../assets/daal.png')} style={{
                height: 30,
                width: 30,
                marginLeft: 15,
                marginVertical: 46,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
            </span>
            <span>
              <View><Text style={{ color: '#414141', fontSize: "12px", fontWeight: "600" }}>Daal Tadka </Text></View>
              <View><Text style={{ color: "#9252AA", fontWeight: "600", textAlign: "right" }}>"₹" 199</Text></View>
            </span>
          </li>
        </ul>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ulclass: {
    color: "#9252AA",
    fontWeight: "600",
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    display: "flex",
    flexWrap: "wrap"
  },
  liclass: {
    listStyle: "none",
    border: "1px solid #B8B8B8",
    marginBottom: "6px",
    marginRight: "6px",
    display: "flex",
    borderRadius: "10px",
    justifyContent: 'space-between',
    alignItems: "center",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingRight: "8px",
    paddingLeft: "8px"
  }
})


export default OrderDetailsMenu;
