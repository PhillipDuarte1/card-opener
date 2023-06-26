import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const Search = ({ onSearch, onOrder }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [ordering, setOrdering] = useState('lastAcquired');
    const [sortOrder, setSortOrder] = useState('asc');
    const [pickerVisible, setPickerVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);

    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

    const items = [
        { label: 'Most Recent', value: 'lastAcquired' },
        { label: 'Name', value: 'name' }
    ]

    const handleSearch = () => {
        onOrder(ordering + ':' + newSortOrder);
        onSearch(searchQuery);
    };

    const handleOrder = () => {
        setSortOrder(newSortOrder);
    };

    const togglePickerVisibility = () => {
        setPickerVisible(false);
        setFilterVisible(!filterVisible);
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
                        onSubmitEditing={handleSearch}
                        returnKeyType='search'
                    />
                    <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
                        <FontAwesome name='search' size={24} color='#2e2828' />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={togglePickerVisibility} style={styles.filterIcon}>
                    <MaterialCommunityIcons name='filter-variant' size={32} color='#fef4f4' />
                </TouchableOpacity>
            </View>
            {filterVisible && (
                <View style={styles.pickerContainer}>
                    <DropDownPicker
                        items={items}
                        defaultValue={ordering}
                        style={styles.pickerStyle}
                        textStyle={{ fontSize: 18 }}
                        // dropDownContainerStyle={{zIndex: 5}}
                        onSelectItem={(item) => setOrdering(item.value)}
                        open={pickerVisible}
                        setOpen={setPickerVisible}
                        placeholder='Select a filter...'
                    />
                    <View style={styles.filterButtonsContainer}>
                        <TouchableOpacity onPress={handleOrder} style={styles.sortButton}>
                            <Text style={styles.sortButtonText}>
                                Sort By:
                            </Text>
                            <Text style={styles.sortButtonIcon}>{sortOrder === 'asc' ? <MaterialCommunityIcons name='arrow-down-thin' size={24} color='#fef4f4' /> : <MaterialCommunityIcons name='arrow-up-thin' size={24} color='#fef4f4' />}</Text>
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
    filterIcon: {
        marginLeft: 20,
        marginRight: 4,
        padding: 6
    },
    pickerContainer: {
        width: '100%'
    },
    pickerStyle: {
        backgroundColor: '#fef4f4',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 2
    },
    filterButtonsContainer: {
        flexDirection: 'row'
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#fef4f4',
        borderColor: 'gray',
        // borderWidth: 1,
        // borderRadius: 12,
        marginTop: 8,
        paddingHorizontal: 18,
        paddingVertical: 6
    },
    sortButtonText: {
        fontSize: 12,
        color: '#fef4f4',
        textAlign: 'center'
    },
    sortButtonIcon: {
        marginLeft: 5
    }
});