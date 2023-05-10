import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../utils/firebase';
import { color } from 'react-native-reanimated';

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
            headerLeft: () => (user ? <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer('Drawer')) }}><MaterialIcons name='menu' size={40} color='black' style={styles.menu} /></TouchableOpacity> : <View></View>),
            // headerRight: () => (<MaterialIcons name='settings' size={24} color='black' />)
            // <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
        });
    }, [user])

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={require('../assets/mountain.png')}  >
                <View style={[styles.bck]} />
                <View style={[styles.bckTwo]} />
            </ImageBackground>
            {user ? (
                <View>
                    <View style={styles.loggedHeaderContainer}>
                        <Text style={styles.loggedHeaderText}>Binder</Text>
                        <Text style={styles.loggedHeaderText}>Packs</Text>
                    </View>
                    <View style={styles.loggedContentContainer}>
                            <Text style={styles.loggedContentText}>Hello {user.displayName},</Text>
                        {/* <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Packs')} style={styles.button}>
                                <Text style={styles.buttonText}>Open Packs</Text>
                            </TouchableOpacity>
                        </View> */}
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
        // justifyContent: 'flex-end',
        paddingTop: '25%',
        height: '100%',
        paddingBottom: '30%',
    },
    headerContainer: {
        position: 'absolute',
        top: 90,
        left: 0,
        padding: 20,
    },
    loggedHeaderContainer: {
        // backgroundColor: 'beige',
        paddingTop: 17,
        paddingBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 2,
        borderBottomColor: 'gray'
    },
    loggedHeaderText: {
        fontSize: 17,
        fontWeight: '700',
        // backgroundColor: 'red',
        paddingHorizontal: 32,
        paddingVertical: 12
    },
    loggedContentContainer: {
        backgroundColor: 'red',
        height: '50%'
    },
    loggedContentText: {
        fontSize: 28,
        fontWeight: '700',
        paddingTop: 70,
        paddingBottom: 20,
        paddingHorizontal: 20
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
    menu: {
        marginLeft: 15,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    }
});