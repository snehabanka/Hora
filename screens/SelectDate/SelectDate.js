import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, ImageBackground, FlatList, ScrollView, StatusBar, View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight, BackHandler } from 'react-native';
import styles from './styles';
import axios from 'axios';
import CustomStatusBar from '../../components/CustomStatusBar';
import { BASE_URL, GET_CUISINE_ENDPOINT, API_SUCCESS_CODE, GET_MEAL_DISH_ENDPOINT } from '../../utils/ApiConstants';
import DateTimePicker from '@react-native-community/datetimepicker';


const SelectDate = ({ route }) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [peopleCount, setPeopleCount] = useState(0);
    const [activeTab, setActiveTab] = useState('left');
    const data = route.params.selectedDishDictionary;
    const [showAll, setShowAll] = useState(false);
    const [burnerCount, setBurnerCount] = useState(0)


    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setSelectedDate(date);
            setShowDatePicker(false);
        }
    };

    const RenderAppliances = ({ item }) => {
        return (
            <View style={{ borderRadius: 5, borderColor: '#DADADA', borderWidth: 1 }}>
                <View style={{ paddingLeft: 5, paddingTop: 5, paddingBottom: 7, flexDirection: 'row' }}>
                <Image source={{ uri: `https://horaservices.com/api/uploads/${item.image}` }} style={{ width: 40, height: 40}} />
                    <Text>{item.name}</Text>
                </View>
            </View>
        );
    };

    const RenderIngredients = ({ item }) => {
        return (
            <View style={{ borderRadius: 5, borderColor: '#DADADA', borderWidth: 1 }}>
                <View style={{ paddingLeft: 5, paddingTop: 5, paddingBottom: 7, flexDirection: 'row' }}>
                <Image source={{ uri: `https://horaservices.com/api/uploads/${item.image}` }} style={{ width: 40, height: 40}} />
                    <Text>{item.name}</Text>
                </View>
            </View>
        );
    };

    const renderPreparationText = ({ items }) => {
        if (showAll) {
            return items.map((item, index) => (
                <Text key={index} style={styles.item}>{`${index + 1}. ${item}`}</Text>
            ));
        } else {
            return items.slice(0, 2).map((item, index) => (
                <Text key={index} style={styles.item}>{`${index + 1}. ${item}`}</Text>
            ));
        }
    };
    

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const LeftTabContent = ({ burnerCount, ApplianceList }) => {
        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <View style={{ flexDirection: 'column' }}>

                    <Text>Required Burners</Text>
                    <Text>(Burners would be used at your location)</Text>

                </View>

                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.image2} source={require('../../assets/selectDish.png')} />
                        <Text>{burnerCount}</Text>

                    </View>

                </View>

                <View style={{ flexDirection: 'column' }}>

                    <View style={{ flexDirection: 'column' }}>
                        <Text>Requires Special Appliances</Text>
                        <Text>(Keep these appliances ready at your location)</Text>

                    </View>

                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Image style={{ height: 1, width: Dimensions.get('window').width * .9 }} source={require('../../assets/verticalSeparator.png')}></Image>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <FlatList
                        data={ApplianceList}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <RenderAppliances item={item} />}
                        numColumns={3}
                        contentContainerStyle={styles.gridContainer}
                    />

                </View>

            </View>
        );
    };

    const RightTabContent = ({ ingredientList }) => {
        return (
            <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'column' }}>
                <Text>Required Burners</Text>
                <Text>((Keep these ingredient ready at your location))</Text>

            </View>

            <View style={{ flexDirection: 'column' }}>
                    <FlatList
                        data={ingredientList}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <RenderIngredients item={item} />}
                        numColumns={3}
                        contentContainerStyle={styles.gridContainer}
                    />

                </View>
            </View>

        );
    };

    const getTotalIngredients = () => {
        const totalIngredients = {};
        for (const dishId in data) {
            const dish = data[dishId];
            if (dish.ingredientUsed) {
                dish.ingredientUsed.forEach((ingredient) => {
                    if (!totalIngredients[ingredient._id]) {
                        totalIngredients[ingredient._id] = {
                            _id: ingredient._id,
                            name: ingredient.name,
                            image: ingredient.image,
                            unit: ingredient.unit,
                            qty: 0
                        };
                    }
                    totalIngredients[ingredient._id].qty += ingredient.qty;
                });
            }
        }
        return Object.values(totalIngredients);
    };


    const getTotalBurnerCount = () => {
        let totalBurnerCount = 0;

        for (const dishId in data) {
            const dish = data[dishId];
            if (dish.is_gas) {
                totalBurnerCount += 1;
            }
        }

        return totalBurnerCount;
    };


    const getTotalCookingTime = () => {
        let totalCookingMinutes = 0;
        for (const dishId in data) {
            const dish = data[dishId];
            if (dish.cooking_min) {
                totalCookingMinutes += parseInt(dish.cooking_min, 10);
            }
        }
        const totalHours = Math.floor(totalCookingMinutes / 60);
        const remainingMinutes = totalCookingMinutes % 60;

        return `${totalHours} hours ${remainingMinutes} minutes`;
    };



    const getPreparationTextList = () => {
        const preparationTextList = [];
        for (const dishId in data) {
            const dish = data[dishId];
            if (dish.preperationtext && dish.preperationtext.trim() !== "") {
                preparationTextList.push(dish.preperationtext);
            }
        }
        return preparationTextList;
    };

    const preparationTextList = getPreparationTextList()
    console.warn(preparationTextList)

    
    const getTotalSpecialAppliances = () => {
        const totalSpecialAppliances = {};
        for (const dishId in data) {
            const dish = data[dishId];
            if (dish.special_appliance_id) {
                dish.special_appliance_id.forEach((appliance) => {
                    if (!totalSpecialAppliances[appliance._id]) {
                        totalSpecialAppliances[appliance._id] = { ...appliance };
                    }
                });
            }
        }
        console.warn(totalSpecialAppliances)
        return Object.values(totalSpecialAppliances);
    };


    const renderTabContent = () => {
        if (activeTab === 'left') {
            const totalBurnerCount = getTotalBurnerCount();
            const totalSpecialAppliancesList = getTotalSpecialAppliances();
            return <LeftTabContent burnerCount={totalBurnerCount} ApplianceList={totalSpecialAppliancesList} />;
        } else if (activeTab === 'right') {
            const totalIngredientsList = getTotalIngredients();
            return <RightTabContent ingredientList={totalIngredientsList} />;
        }
    };

    const handleTimeChange = (event, time) => {
        if (time !== undefined) {
            setSelectedTime(time);
            setShowTimePicker(false);
        }
    };

    const increasePeopleCount = () => {
        setPeopleCount(peopleCount + 1)
    }

    const decreasePeopleCount = () => {
        if (peopleCount != 0) {
            setPeopleCount(peopleCount - 1)
        }
    }

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

            <View style={{ justifyContent: 'space-between', marginTop: 17, paddingTop: 28, paddingBottom: 9, backgroundColor: '#FFFFFF', width: Dimensions.get("window").width, borderRadius: 10, height: 170, elevation: 2 }}>
                <View style={{ paddingLeft: 9, paddingEnd: 16, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={{ marginTop: 4, flexDirection: 'column', paddingHorizontal: 16, backgroundColor: 'white', borderColor: '#F6ECEC', borderRadius: 10, borderWidth: 1, paddingBottom: 9 }}>
                        <Text style={{ paddingTop: 4 }}>Select Date</Text>
                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <Text>{selectedDate.toDateString()}</Text>
                            </TouchableOpacity>
                            <Image source={require('../../assets/clock.png')} style={{ height: 19, width: 19, marginLeft: 17 }} />
                            {showDatePicker && (
                                <DateTimePicker
                                    value={selectedDate}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                />
                            )}
                        </View>
                    </View>
                    <View style={{ paddingLeft: 9, paddingEnd: 13, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View style={{ marginTop: 4, flexDirection: 'column', paddingHorizontal: 16, backgroundColor: 'white', borderColor: '#F6ECEC', borderRadius: 10, borderWidth: 1 }}>
                            <Text>Select Time</Text>
                            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                                    <Text>{selectedTime.toLocaleTimeString()}</Text>
                                </TouchableOpacity>
                                <Image source={require('../../assets/clock.png')} style={{ height: 19, width: 19, marginLeft: 17 }} />
                                {showTimePicker && (
                                    <DateTimePicker
                                        value={selectedTime}
                                        mode="time"
                                        display="default"
                                        onChange={handleTimeChange}
                                    />
                                )}
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.verticalSeparator} source={require('../../assets/verticalSeparator.png')}></Image>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 13, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/people.png')} style={{ height: 24, width: 24, marginLeft: 10 }} />
                    <Text style={{ marginLeft: 5, color: '#3C3C3E', fontWeight: '500' }}>How many people you are hosting?</Text>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <TouchableOpacity onPress={increasePeopleCount}>
                            <Image source={require('../../assets/plus.png')} style={{ height: 24, width: 24, marginLeft: 5 }} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 3 }}>{peopleCount}</Text>
                        <TouchableOpacity onPress={decreasePeopleCount}>
                            <Image source={require('../../assets/minus.png')} style={{ height: 24, width: 24, marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', borderRadius: 10, marginLeft: 13, paddingLeft: 11, paddingRight: 11, marginTop: 15, borderRadius: 10, backgroundColor: '#F9E9FF' }}>
                    <Image source={require('../../assets/info.png')} style={{ height: 16, width: 16 }} />
                    <Text style={{ color: '#9252AA', fontWeight: '700', marginLeft: 4 }}>₹ 49/person would be added to bill value in addition to dish price</Text>

                </View>


            </View>
            <View style={{ justifyContent: 'center' }}>
                <Text >Required Procurement ?</Text>
                <Text >Keep these Appliances and Ingredients ready before chef Arrival</Text>
            </View>

            <View style={styles.tabSwitch}>
                <TouchableOpacity onPress={() => setActiveTab('left')}>
                    <Text style={activeTab === 'left' ? styles.activeTab : styles.inactiveTab}>Left Tab</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('right')}>
                    <Text style={activeTab === 'right' ? styles.activeTab : styles.inactiveTab}>Right Tab</Text>
                </TouchableOpacity>
            </View>
            {renderTabContent()}
            <View style={{ flexDirection: 'column' }}>
                <View style={styles.header}>
                    <Text style={{}}>Readiness Required*</Text>
                    <TouchableOpacity onPress={toggleShowAll}>
                        <Text style={styles.showAllText}>{showAll ? 'Show Less' : 'Show All'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{}}>
                    {/* {renderPreparationText(preparationTextList)} */}
                </View>
            </View>
        </View>
    )
}


export default SelectDate;