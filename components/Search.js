import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Search = ({ onSearch, onOrder }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [ordering, setOrdering] = useState('lastAcquired');
    const [pickerVisible, setPickerVisible] = useState(false);

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleOrder = () => {
        onOrder(ordering);
    };

    const togglePickerVisibility = () => {
        setPickerVisible(!pickerVisible);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder='Search by name'
            />
            <Button onPress={handleSearch} title='Search' />

            <View style={styles.orderContainer}>
                <Text>Order by:</Text>
                <Button onPress={togglePickerVisibility} title='Select' />
                {pickerVisible && (
                    <Picker
                        selectedValue={ordering}
                        onValueChange={(itemValue) => setOrdering(itemValue)}
                        style={styles.picker}
                        onDonePress={togglePickerVisibility}
                    >
                        <Picker.Item label='Last Acquired' value='lastAcquired' />
                        <Picker.Item label='Name' value='name' />
                    </Picker>
                )}
            </View>
            <Button onPress={handleOrder} title='Order' />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        marginBottom: 8,
    },
    orderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    picker: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        marginRight: 8,
    },
});