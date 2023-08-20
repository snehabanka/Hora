import * as React from 'react';
import { View, useWindowDimensions, Text, StyleSheet } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import OrderDetailsMenu from './OrderDetailsMenu';
import OrderDetailsIngre from './OrderDetailsIngre';
import OrderDetailsAppli from './OrderDetailsAppli';


export default function OrderDetailsTabs({OrderDetail}) {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Menu' },
        { key: 'second', title: 'Ingredients' },
        { key: 'third', title: 'Appliances' },
    ]);

   

    const renderScene = ({ route }) => {
        switch (route.key) {
          case 'first':
            return <OrderDetailsMenu OrderDetail={OrderDetail} />;
          case 'second':
            return <OrderDetailsIngre OrderDetail={OrderDetail} />;
          case 'third':
            return <OrderDetailsAppli OrderDetail={OrderDetail} />;
            default:
                return null;
        }
      };

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'#823D9D'}
            pressOpacity={1}
            inactiveColor={'#969696'}
            indicatorStyle={{backgroundColor: '#823D9D' , borderRadius:"20px"}}
            labelStyle={{fontWeight:"600" , textTransform:"capitalize", fontSize:"15px"}}
            style={{ marginTop: 15, backgroundColor: '#fff', textTransform:"lowercase" ,  boxShadow: "0 0 5px #9f9e9e"}}
        />
    );

    return (
        <TabView
            navigationState={{ index, routes , OrderDetail}}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
         />
    );
}


