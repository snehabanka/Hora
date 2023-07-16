// CustomStatusBar.js
import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';

const CustomStatusBar = ({ backgroundColor, barStyle }) => {
  return (
    <View style={[styles.statusBarContainer, { backgroundColor }]}>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBarContainer: {
    height: StatusBar.currentHeight,
  },
});

export default CustomStatusBar;
