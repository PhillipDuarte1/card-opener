import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const Search = ({ onSearch, onOrder }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [ordering, setOrdering] = useState('lastAcquired');
    const [pickerVisible, setPickerVisible] = useState(false);

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleOrder = () => {
        onOrder(ordering); // Pass the ordering value to onOrder function
    };

    const togglePickerVisibility = () => {
        setPickerVisible(!pickerVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchbar}>
                    <TextInput
                        style={styles.input}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder='Search By Name'
                        placeholderTextColor='#2e2828'
                    />
                    <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
                        <FontAwesome name='search' size={24} color='#2e2828' />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={togglePickerVisibility} style={styles.plusIcon}>
                    <MaterialCommunityIcons name='filter-variant' size={32} color='#fef4f4' />
                </TouchableOpacity>
            </View>
            {pickerVisible && (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={ordering}
                        onValueChange={(itemValue) => setOrdering(itemValue)}
                        itemStyle={styles.picker}
                        onDonePress={togglePickerVisibility}
                    >
                        <Picker.Item label='Last Acquired' value='lastAcquired' />
                        <Picker.Item label='Name' value='name' />
                    </Picker>
                    <View style={styles.filterButtonsContainer}>
                        <TouchableOpacity onPress={handleOrder} style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>Order By</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleOrder} style={styles.sortButton}>
                            <Text style={styles.sortButtonText}>Sort By</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 30,
        marginBottom: 20
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    searchbar: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 18,
        backgroundColor: '#fef4f4',
        paddingHorizontal: 16
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#424242'
    },
    searchIcon: {
        padding: 6
    },
    plusIcon: {
        marginLeft: 20,
        padding: 6
    },
    pickerContainer: {
        width: '100%'
    },
    picker: {
        color: '#fef4f4'
    },
    filterButtonsContainer: {
        flexDirection: 'row'
    },
    orderButton: {
        backgroundColor: '#fef4f4',
        borderRadius: 18,
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    sortButton: {
        backgroundColor: '#fef4f4',
        borderRadius: 18,
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    orderButtonText: {
        fontSize: 18,
        color: '#2e2828',
        textAlign: 'center'
    },
    sortButtonText: {
        fontSize: 18,
        color: '#2e2828',
        textAlign: 'center'
    }
});
