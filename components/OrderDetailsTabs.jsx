import * as React from 'react';
import { View, useWindowDimensions, Text, StyleSheet } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import OrderDetailsMenu from './OrderDetailsMenu';
import OrderDetailsIngre from './OrderDetailsIngre';
import OrderDetailsAppli from './OrderDetailsAppli';


export default function OrderDetailsTabs({ OrderDetail, OrderMenu }) {
  console.log("orderDetailstab")
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Menu' },
    { key: 'second', title: 'Appliances' },
    { key: 'third', title: 'Ingredients' },
  ]);



  const renderScene = ({ route }) => {
    console.log("renderScene")
    switch (route.key) {
      case 'first':
        console.log("renderScene1")
        return <OrderDetailsMenu OrderDetailMenu={OrderMenu} />;
        break;
      case 'second':
        return <OrderDetailsAppli OrderDetailMenu={OrderMenu} />;
      case 'third':
        return <OrderDetailsIngre OrderDetailMenu={OrderMenu} /> ;
    }
  };

  const renderTabBar = props => (
   
    <TabBar
      {...props}
      activeColor={'#823D9D'}
      activeTintColor='red'
      pressOpacity={1}
      inactiveColor={'#969696'}
      indicatorStyle={{
        backgroundColor: 'rgba(184, 184, 184, 1)',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 50
      }}
      labelStyle={{ fontWeight: "600", textTransform: "capitalize", fontSize: 15 }}
      style={{
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: '#fff',
        // paddingTop:0,
        // paddingBottom:0,
        // maxHeight:30
      }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes, OrderDetail }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}


