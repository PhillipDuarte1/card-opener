import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DrawerActions, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({ navigation, user }) => {
    const route = useRoute();

    useEffect(() => {
        navigation.setOptions({
            title: '',
            headerTransparent: true,
            headerStyle: {
                height: 200
            },
            headerLeft: () => {
                if (route.name === 'Main' && user) {
                    return (
                        <View style={styles.hamTextContainer}>
                            <Text style={styles.loggedContentText}>Hi {user.displayName} &#x1F44B;</Text>
                            <Text style={styles.loggedContentSubtext}>Welcome back!</Text>
                        </View>
                    );
                } else if (route.name === 'Main' && !user) {
                    return null;
                } else {
                    return (
                        <View style={styles.headerLeftContainer}>
                            <Text style={styles.headerLeftText}>{route.name}</Text>
                        </View>
                    );
                }
            },
            headerRight: () => {
                if (route.name === 'Main' && !user) {
                    return (
                        <View>
                            
                        </View>
                    )
                } else {
                    return (
                        <View style={styles.hamContainer}>
                            <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer('Drawer')) }}>
                                <View style={styles.circle}>
                                    <MaterialIcons name='menu' size={40} color='black' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }
            },
        });
    }, [navigation, user]);

    return null;
};

export default Header;

const styles = StyleSheet.create({
    hamContainer: {
        marginRight: 30,
    },
    hamTextContainer: {
        marginLeft: 30
    },
    loggedContentText: {
        fontSize: 28,
        fontWeight: '200',
        color: '#fef4f4'
    },
    loggedContentSubtext: {
        fontSize: 35,
        fontWeight: '700',
        marginRight: -100,
        color: '#fef4f4'
    },
    headerLeftContainer: {
        marginLeft: 30,
    },
    headerLeftText: {
        fontSize: 40,
        fontWeight: '700',
        color: '#fef4f4',
        marginTop: 12,
        // backgroundColor: 'blue',
        // width: 2000
    },
    circle: {
        width: 50,
        height: 50,
        marginTop: 12,
        borderRadius: 30,
        backgroundColor: '#fef4f4',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
