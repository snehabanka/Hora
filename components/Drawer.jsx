import React, { useState } from 'react';
import type {Node} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MenuDrawer from 'react-native-side-drawer';


const Drawer = (props) => {
    const overlay = false
    const position = 'left'
  
    const drawerContent = () => {
      const edges = position == 'right' ? ['bottom', 'top', 'right'] : ['bottom', 'top', 'left']
      const baseStyle = {flex: 1, backgroundColor: 'blue', borderStyle: 'solid', borderWidth: 2, borderColor: 'black'}
  
      return(
        <SafeAreaView edges={edges} style={baseStyle}>
          <View style={{flexDirection: 'column', backgroundColor: 'orange', flex: 1, padding: 20}}>
            <Text>Overlay={overlay.toString()}</Text>
            <Text style={styles.text}>Position={position}</Text>
            <TouchableOpacity onPress={props.toggleDrawer}>
              <Text style={styles.textLink}>I will disappear if you click here</Text>
            </TouchableOpacity>
            <Text style={styles.text}>When using overlay you will need to account for SafeAreView and it needs unique styling</Text>
            </View>
        </SafeAreaView>
      )
    }
  
    return (
      <MenuDrawer
        open={props.open}
        drawerContent={drawerContent()}
        position={position}
        drawerPercentage={40}
        animationTime={250}
        overlay={overlay}
        opacity={0.5}>
      {props.children}
      </MenuDrawer>
    );
  }