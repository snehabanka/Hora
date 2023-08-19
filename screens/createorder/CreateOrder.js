import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, ImageBackground, FlatList, ScrollView, StatusBar, View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight, BackHandler } from 'react-native';
import styles from './styles'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomStatusBar from '../../components/CustomStatusBar';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BASE_URL, GET_CUISINE_ENDPOINT, API_SUCCESS_CODE, GET_MEAL_DISH_ENDPOINT } from '../../utils/ApiConstants';

const CreateOrder = ({navigation}) => {
    const [selected, setSelected] = useState('veg');
    const [cuisines, setCuisines] = useState([]);
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [mealList, setMealList] = useState([]);
    const [isSelectedDish, setIsSelectedDish] = useState(false);
    const [dishDetail, setDishDetail] = useState(null)
    const [selectedCount, setSelectedCount] = useState(0);
    const [selectedDishes, setSelectedDishes] = useState([]);
    const bottomSheetRef = useRef(null);
    const [selectedDishPrice,setSelectedDishPrice]= useState(0)
    const [selectedDishDictionary, setSelectedDishDictionary] = useState({});
 

    const handleViewAll = (categoryId) => {
        setExpandedCategories((prevExpanded) =>
            prevExpanded.includes(categoryId)
                ? prevExpanded.filter((id) => id !== categoryId)
                : [...prevExpanded, categoryId]
        );
    };

    const openBottomSheet = (dishDetail,bottomSheetRef) => {
        setDishDetail(dishDetail)
        bottomSheetRef.current.open();

    };

    const 
    closeBottomSheet = () => {
        console.warn('close')
        setDishDetail(null)
        bottomSheetRef.current.close();
    };

    const addDish = () => {
        navigation.navigate('SelectDate',{selectedDishDictionary})
     }

    const renderServedItem = ({ item }) => (
        <View style={styles.textContainer}>
            <Text style={styles.text}>{item}</Text>
        </View>
    );

    const RenderBottomSheetContent = () => (
        <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Image source={{ uri: `https://horaservices.com/api/uploads/${dishDetail.image}` }}  style={{ width: Dimensions.get('window').width * 0.9, height: 184, borderTopLeftRadius: 45, borderTopRightRadius: 45 }} />
            <Text style={{ color: '#1C1C1C', fontSize: 23, fontWeight: '800' }}>{dishDetail.name}</Text>
            <Image source={require('../../assets/Vector4.png')} style={{ width: 332.5, height: 1 }} />
            <Text style={{ color: '#736F6F', fontSize: 9, fontWeight: '400', opacity: 0.9 }}>{dishDetail.description}</Text>
            <Image source={require('../../assets/Vector4.png')} style={{ width: 332.5, height: 1 }} />

            <View style={{ marginTop: 7, backgroundColor: '#F7F2F9', width: 343, borderRadius: 5, borderWidth: 1, borderColor: '#9252AA', justifyContent: 'center', alignItems: 'start', padding: 10 }}>
                <Text style={{ color: '#4F4F4F', fontSize: 13, fontWeight: '400' }}>{dishDetail.per_plate_qty.qty} Serve/ Person</Text>
            </View>
            <View style={{ padding: 10, marginTop: 4, flexDirection: 'column', backgroundColor: '#F7F2F9', width: 343, borderWidth: 1, borderRadius: 5, borderColor: '#9252AA' }}>
                <Text style={{ color: '#9C9B9B', fontSize: 11, fontWeight: '700' }}>Appliance Required</Text>
                <View style={{ flexDirection: 'row', marginTop: 3 }}>
                    <Image source={require('../../assets/plus.png')} style={{ width: 25, height: 25 }} />
                    <Text style={{ color: '#4B4B4B', fontSize: 12, fontWeight: '400', marginLeft: 10, marginTop: 4 }}>Charcoal Burner</Text>
                </View>
            </View>
            <View style={{ marginTop: 4, flexDirection: 'column', backgroundColor: '#F7F2F9', padding: 10, width: 343, borderWidth: 1, borderRadius: 5, borderColor: '#9252AA' }}>
                <Text style={{ color: '#9C9B9B', fontSize: 11, fontWeight: '700' }}>Advance Preparations required</Text>
                <Text style={{ color: '#4B4B4B', fontSize: 12, fontWeight: '400' }}>{dishDetail.preperationtext}</Text>
            </View>
            <View style={{ marginTop: 5, padding: 10, flexDirection: 'column', backgroundColor: '#F7F2F9', width: 343, borderWidth: 1, borderRadius: 5, borderColor: '#9252AA' }}>
                <Text style={{ color: '#9C9B9B', fontSize: 11, fontWeight: '700' }}>Served With</Text>
                <View>
                    <FlatList
                        data={dishDetail.serving_dish}
                        renderItem={renderServedItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        contentContainerStyle={styles.container}
                        columnWrapperStyle={styles.columnWrapper}
                    />
                </View>

            </View>

            <View style={styles.bottomButtonContainer}>
            <TouchableHighlight onPress={() => handleIncreaseQuantity} style={styles.customButton} underlayColor="transparent" activeOpacity={1}>
                <Text style={styles.buttonText1}>Add Dish</Text>
            </TouchableHighlight>
        </View>
            </ScrollView>
        </View>

    );

    const handleIncreaseQuantity = (dish,isSelected) => {
        const updatedSelectedDishes = [...selectedDishes];
        const updatedSelectedDishDictionary = { ...selectedDishDictionary };
        if (updatedSelectedDishes.includes(dish._id)) {
            const index = updatedSelectedDishes.indexOf(dish._id);
            updatedSelectedDishes.splice(index, 1);
        } else {
            updatedSelectedDishes.push(dish._id);
        }
        setSelectedDishes(updatedSelectedDishes);
        setSelectedCount(updatedSelectedDishes.length);
        if(isSelected){
            const updatedPrice=selectedDishPrice -  parseInt(dish.price, 10)
            setSelectedDishPrice(updatedPrice)
        }
        else{
        const updatedPrice=selectedDishPrice +  parseInt(dish.price, 10)
        setSelectedDishPrice(updatedPrice)
        }
        if (updatedSelectedDishDictionary[dish._id]) {
            delete updatedSelectedDishDictionary[dish._id];
          } else {
            updatedSelectedDishDictionary[dish._id] = dish;
          }
          setSelectedDishDictionary(updatedSelectedDishDictionary);
      
    }

    const renderDishItem = ({ item }) => (
        <TouchableOpacity onPress={() => openBottomSheet(item,bottomSheetRef)}>
            <View style={{ width: '33%', padding: 2, justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'column' }}>
                    <ImageBackground
                        source={
                            selectedDishes.includes(item._id)
                                ? require('../../assets/Rectanglepurple.png')
                                : require('../../assets/rectanglewhite.png')
                        }
                        style={{ width: 106, height: 132, marginTop: 33 }}
                        imageStyle={{ borderRadius: 16 }}
                    >
                        <View style={{ flexDirection: 'column', paddingHorizontal: 5 }} >
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: `https://horaservices.com/api/uploads/${item.image}` }} style={{ width: 80, height: 80, borderRadius: 40, marginTop: -30 }} />
                            </View>
                            <Text style={{ height: 30, marginHorizontal: 5, textAlign: 'left', fontWeight: '600', fontSize: 11, color: '#9252AA', opacity: 0.9, marginTop: 8, marginBottom: 8,color: selectedDishes.includes(item._id) ? 'white' : '#9252AA',}}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingStart: 6, paddingEnd: 6, }}>
                                <Text style={{ textAlign: 'center', color: '#9252AA', fontWeight: '700', fontSize: 17, opacity: 0.9,color: selectedDishes.includes(item._id) ? 'white' : '#9252AA' }}>₹ {item.price}</Text>
                                <TouchableOpacity onPress={() => handleIncreaseQuantity(item,selectedDishes.includes(item._id))}>
                                    <Image
                                        source={
                                            selectedDishes.includes(item._id)
                                                ? require('../../assets/minus.png')
                                                : require('../../assets/plus.png')
                                        }
                                        style={{ width: 21, height: 21, }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', paddingHorizontal: 17 }}>
                            <Image
                                source={
                                    item.is_dish===0
                                        ? require('../../assets/Rectanglered.png')
                                        : require('../../assets/Rectanglegreen.png')
                                }
                                style={{ width: 72, height: 3, marginTop: 9 }}
                            />
                        </View>
                    </ImageBackground>
                </View>


            </View>
            <RBSheet
                ref={bottomSheetRef}
                closeOnDragDown={[true,closeBottomSheet]}
                height={650}
                customStyles={{
                    container: styles.bottomSheetContainer,
                    wrapper: styles.bottomSheetWrapper,
                    draggableIcon: styles.draggableIcon,
                }}
            >
                <RenderBottomSheetContent/>

            </RBSheet>
        </TouchableOpacity>



    );


    const handlePress = (type) => {
        setSelected(type)
    };

    useEffect(() => {
        const fetchCuisineData = async () => {
            try {
                const url = BASE_URL + GET_CUISINE_ENDPOINT;
                const requestData = {
                    type: "cuisine"
                };
                const response = await axios.post(url, requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status == API_SUCCESS_CODE) {
                    const names = response.data.data.configuration.map(({ _id, name }) => [_id, name]);
                    setCuisines(names)
                }
            } catch (error) {
                console.log('Error Fetching Data:', error.message);
            }
        };
        fetchCuisineData();
    }, []);

    const handleCuisinePress = (cuisineId) => {
        setSelectedCuisines((prevSelected) => {
            if (prevSelected.includes(cuisineId)) {
                return prevSelected.filter((item) => item !== cuisineId);
            } else {
                return [...prevSelected, cuisineId];
            }
        });
        fetchMealBasedOnCuisine()
    };

    const fetchMealBasedOnCuisine = async () => {
        try {
            const url = BASE_URL + GET_MEAL_DISH_ENDPOINT;
            const is_dish = selected == "veg" ? 1 : 0
            const requestData = {
                cuisineId: selectedCuisines,
                is_dish: is_dish
            };
            const response = await axios.post(url, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status == API_SUCCESS_CODE) {
                setMealList(response.data.data)
            }
        } catch (error) {
            console.log('Error Fetching Data:', error.message);
        }
    }

    const renderItem = ({ item }) => {
        const isSelected = selectedCuisines.includes(item[0]);

        return (
            <TouchableOpacity
                style={[styles.button, isSelected && styles.selectedButton]}
                onPress={() => handleCuisinePress(item[0])}
            >
                <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>{item[1]}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.screenContainer}>
            <View style={styles.view1}>
                <Image style={styles.image1} source={require('../../assets/info.png')} />
                <Text style={styles.text1}>Bill value depends upon Dish selected + Number of people</Text>
            </View>
            <View style={styles.view2}>
                <Image style={styles.image2} source={require('../../assets/selectDish.png')} />
                <Image style={styles.image3} source={require('../../assets/separator.png')} />
                <Image style={styles.image2} source={require('../../assets/SelectDateAndTime.png')} />
                <Image style={styles.image3} source={require('../../assets/separator.png')} />
                <Image style={styles.image2} source={require('../../assets/selectDish.png')} />

            </View>

            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button, selected === 'veg' && styles.selectedButton]}
                    onPress={() => handlePress('veg')}
                >
                    <Text style={[styles.buttonText, selected === 'veg' && styles.selectedButtonText]}>Veg</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, selected === 'nonveg' && styles.selectedButton]}
                    onPress={() => handlePress('nonveg')}
                >
                    <Text style={[styles.buttonText, selected === 'nonveg' && styles.selectedButtonText]}>Non Veg</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.verticalSeparator} source={require('../../assets/verticalSeparator.png')}></Image>
            </View>

            <View style={{ marginLeft: 16 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: 'black', marginTop: 9 }}>
                    Select Cuisines
                </Text>
                <FlatList
                    data={cuisines}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    numColumns={3}
                    contentContainerStyle={styles.cuisineContainer}
                    columnWrapperStyle={styles.cuisineColumnWrapper}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.verticalSeparator} source={require('../../assets/verticalSeparator.png')}></Image>
            </View>

            <ScrollView style={{ paddingHorizontal: 12 }}>
                <FlatList
                    data={mealList}
                    keyExtractor={(item) => item.mealObject._id}
                    renderItem={({ item }) => (
                        <View style={{ marginVertical: 5 }}>
                            <View style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#000', fontSize: 13, fontWeight: '600' }}>{item.mealObject.name}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => handleViewAll(item.mealObject._id)}>
                                        <Text style={{ color: '#9252AA', fontWeight: '400', textDecorationLine: 'underline', fontSize: 11, marginLeft: 10 }}>View All</Text>

                                    </TouchableOpacity>
                                    <Image style={{ width: 9, height: 9, marginLeft: 8 }} source={require('../../assets/Vector.png')}></Image>
                                </View>

                            </View>

                            {expandedCategories.includes(item.mealObject._id) ? (
                                // Show all dishes if this category is expanded
                                <FlatList
                                    data={item.dish}
                                    keyExtractor={(dish) => dish._id}
                                    renderItem={renderDishItem}
                                    numColumns={3} // Set numColumns to 3 for the grid layout
                                    contentContainerStyle={styles.dishContainer}
                                    columnWrapperStyle={styles.dishColumnWrapper}
                                />
                            ) : (
                                // Show only the first 3 dishes if this category is collapsed
                                <FlatList
                                    data={item.dish.slice(0, 3)}
                                    keyExtractor={(dish) => dish._id}
                                    renderItem={renderDishItem}
                                    numColumns={3}
                                    contentContainerStyle={styles.dishContainer}
                                    columnWrapperStyle={styles.dishColumnWrapper}
                                />
                            )}
                        </View>
                    )}
                />
            </ScrollView>
            <View style={{paddingHorizontal:16,justifyContent:'space-between'}}>
            <TouchableHighlight onPress={addDish} style={styles.continueButton} underlayColor="transparent" activeOpacity={1}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',paddingHorizontal:16 }}>
            <Text style={styles.buttonText1}>Continue</Text>
            <Text style={styles.buttonText1}>{selectedCount} Items | ₹ {selectedDishPrice}</Text>
        </View>

            </TouchableHighlight>
        </View>

        </View>
    );
}
export default CreateOrder























