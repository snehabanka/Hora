import React from 'react';
import {Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation  from './navigation/StackNavigation'
import DrawerNavigation from './components/Drawer';


const App = () => {
  return ( 
    <NavigationContainer>
            <StackNavigation/>
    </NavigationContainer>
  //    <GestureHandlerRootView style={{ flex: 1 }}>
  //    <NavigationContainer initialRouteName="Contact">
  //      {shouldUseDrawer ?
  //        <DrawerNavigation />
  //        : <StackNavigation />}
  //    </NavigationContainer>
  //  </GestureHandlerRootView>
  );
};

export default App;
