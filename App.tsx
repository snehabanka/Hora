import React from 'react';
import {Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation  from './navigation/StackNavigation'
import DrawerNavigation from './navigation/DrawerNavigation';

const App = () => {
  return (
    <NavigationContainer>
            <StackNavigation/>
    </NavigationContainer>
  );
};

export default App;
