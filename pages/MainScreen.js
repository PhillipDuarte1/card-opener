import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../utils/firebase';

const MainScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title: '',
            headerTransparent: true,
            headerStyle: {
                height: 200
            },
            headerLeft: () => (
                user ? (
                    <View style={styles.hamTextContainer}>
                        <Text style={styles.loggedContentText}>Hi {user.displayName} &#x1F44B;</Text>
                        <Text style={styles.loggedContentSubtext}>Welcome back!</Text>
                    </View>
                ) : null
            ),
            headerRight: () => (
                user ? (
                    <View style={styles.hamContainer}>
                        <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer('Drawer')) }}>
                            <View style={styles.circle}>
                                <MaterialIcons name='menu' size={40} color='black' />
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : null
            ),
        });
    }, [user]);

    return (
        <View style={styles.container}>
            {user ? (
                <View>
                    <View style={styles.loggedContentContainer}>
                    </View>
                </View>
            ) : (
                <View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerMain}>Welcome,</Text>
                        <Text style={styles.headerSub}>Get access to exclusive packs and features by creating an account</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View >
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2e2828',
        height: '100%',
        paddingBottom: '30%'
    },
    hamContainer: {
        // marginTop: 34,
        marginRight: 30,
    },
    hamTextContainer: {
        marginLeft: 30
    },
    headerContainer: {
        position: 'absolute',
        top: 90,
        left: 0,
        padding: 20,
    },
    loggedContentContainer: {
        // backgroundColor: 'gray',
        // height: '100%',
        padding: 30
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerMain: {
        fontSize: 46,
        fontWeight: '700',
        color: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: .5,
        shadowRadius: 20
    },
    headerSub: {
        fontSize: 16,
        paddingLeft: 14
    },
    button: {
        alignSelf: 'center',
        width: '50%',
        borderRadius: 8,
        paddingVertical: 16,
        color: '#fff',
        backgroundColor: 'gray',
        marginTop: 25
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    circle: {
        width: 50,
        height: 50,
        marginTop: 10,
        borderRadius: 30,
        backgroundColor: '#fef4f4',
        alignItems: 'center',
        justifyContent: 'center'
      },
});