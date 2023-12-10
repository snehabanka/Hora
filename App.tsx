import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import DrawerNavigation from './components/Drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const shouldUseDrawer = true;

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <NavigationContainer>
    //     {/* {shouldUseDrawer ? ( */}
    //       <DrawerNavigation />
    //     {/* )  */}
    //     {/* : (
    //       <StackNavigation />
    //     )} */}
    //   </NavigationContainer>
    // </GestureHandlerRootView>
    
    <NavigationContainer>
          <StackNavigation />
      </NavigationContainer>
  );
};

export default App;
