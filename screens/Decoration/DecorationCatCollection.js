import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CustomHeader from '../../components/CustomeHeader';
import RBSheet from 'react-native-raw-bottom-sheet';

const DecorationCatCollection = ({ route, navigation }) => {
  const { category } = route.params;
  const bottomSheetRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [catalogueData, setCatalogueData] = useState([
    { name: 'Red and Yellow Balloon Decoration', image: require('../../assets/decimage1.jpg') , price:200 },
    { name: 'Unicorn Theme Decoration', image: require('../../assets/ballon-dec2.jpg')  , price:300},
    { name: 'Car Decoration Theme', image: require('../../assets/ballon-dec3.jpg') , price:500},
    // Add more items as needed
  ]);

  const openBottomSheet = (item) => {
    setSelectedItem(item);
    bottomSheetRef.current.open();
  };

  const closeBottomSheet = () => {
    setSelectedItem(null);
    bottomSheetRef.current.close();
  };

  const RenderBottomSheetContent = () => (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {selectedItem && (
        <>
          <Image source={selectedItem.image} style={styles.bottomSheetItemImage} />
          <Text style={styles.bottomSheetItemText}>{selectedItem.name}</Text>
          <Text style={styles.bottomSheetItemText}>{selectedItem.price}{' Rs'}</Text>
        </>
      )}
    </View>
  );

  return (
    <ScrollView>
      <CustomHeader title={"Home"} navigation={navigation} />
      <View>
        <Text style={styles.catalogueTitle}>{`Our Catalogue for ${category}`}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.decContainer}>
          {catalogueData.map((item, index) => (
            <TouchableOpacity key={index} style={styles.decImageContainer} onPress={() => openBottomSheet(item)}>
              <Image source={item.image} style={styles.decCatimage} />
              <Text style={styles.decImageText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        height={520}
        customStyles={{
          container: styles.bottomSheetContainer,
          wrapper: styles.bottomSheetWrapper,
          draggableIcon: styles.draggableIcon,
        }}
      >
        <RenderBottomSheetContent />
      </RBSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  decContainer: {
    flexDirection: 'row',
    padding: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', // Allow items to wrap to the next line
  },
  decImageContainer: {
    width: '48%', // Set to 48% width to fit two items in a row
    aspectRatio: 1, // Maintain the aspect ratio of the images
    marginBottom: 50,
    textAlign: 'center',
    elevation: 2, // Android shadow (adjust as needed)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.14,
    shadowRadius: 16,
  },
  decCatimage: {
    width: '100%', // Set to 100% width
    height: '100%',
    borderRadius: 10, // Optional: Add border-radius for rounded corners
  },
  decImageText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
    marginTop: 1,
    textAlign: 'left',
    paddingLeft: 8,
    marginTop: 6,
  },
  catalogueTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 0,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetWrapper: {
    backgroundColor: 'transparent',
  },
  draggableIcon: {
    backgroundColor: '#000',
  },
  bottomSheetItem: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomSheetItemImage: {
    width: 330,
    height: 400,
    borderRadius: 10,
  },
  bottomSheetItemText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
});

export default DecorationCatCollection;
