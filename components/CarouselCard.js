import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CarouselCard = () => {
    return (
        <View style={styles.cardContainer}>
            <MaterialIcons name='keyboard-arrow-right' size={28} color='black' style={styles.carouselCard} />
            <Text style={styles.text}>Bottom Left Text</Text>
        </View>
    )
}

export default CarouselCard;

const styles = StyleSheet.create({
    cardContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: '#fef4f4',
        width: 290,
        height: 230,
        borderRadius: 30
    },
    carouselCard: {
        marginRight: 20,
        marginBottom: 20
    },
    text: {
        position: 'absolute',
        left: 24,
        bottom: 24,
        color: '#000000',
        fontSize: 18,
        fontWeight: '500'
    }
});