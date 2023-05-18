import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContentBox = ({ margin }) => {
    return (
        <View style={[styles.contentBoxContainer, {marginVertical: margin}]}>
            <View style={styles.icon}></View>
            <View style={styles.contentBoxTextContainer}>
                <Text style={styles.contentBoxText}>Text</Text>
                <Text style={styles.contentBoxSubtext}>Subtext</Text>
            </View>
            <View>
                <Text style={styles.contentBoxExtraText}>Placeholder</Text>
            </View>
        </View>
    )
}

export default ContentBox;

const styles = StyleSheet.create({
    contentBoxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentBoxTextContainer: {
        flex: 1
    },
    contentBoxText: {
        fontSize: 22,
        fontWeight: '500',
        color: '#fef4f4'
    },
    contentBoxSubtext: {
        fontSize: 16,
        fontWeight: '300',
        color: '#fef4f4'
    },
    contentBoxExtraText: {
        color: '#fef4f4'
    },
    icon: {
        backgroundColor: 'red',
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 20
    }
});
