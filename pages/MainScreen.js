import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
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
            headerStyle: {
                // backgroundColor: 'transparent',
            },
            headerLeft: () => (user ? <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer('Drawer')) }}><MaterialIcons name='menu' size={40} color='black' style={styles.menu} /></TouchableOpacity> : <View></View>),
            // headerRight: () => (<MaterialIcons name='settings' size={24} color='black' />)
            // <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
        });
    }, [user])

    return (
        <View style={styles.container}>
            {user ? (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerMain}>Welcome, {user.displayName}</Text>
                </View>
            ) : (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerMain}>Welcome,</Text>
                    <Text style={styles.headerSub}>Get access to exclusive packs and features by creating an account</Text>
                </View>
            )}
            {user ? (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Packs')} style={styles.button}>
                        <Text>Open Packs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Binder')}>
                        <Text>View Binder</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View >
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        height: '100%',
        paddingBottom: '30%',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20,
    },
    headerMain: {
        fontSize: 46,
        fontWeight: '700'
    },
    headerSub: {
        fontSize: 16,
        paddingLeft: 14
    },
    button: {
        alignSelf: 'center',
        width: '76%',
        borderRadius: 50,
        paddingVertical: 16,
        marginVertical: 8,
        color: '#fff',
        backgroundColor: '#222e5a'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: '#fff'
    },
    menu: {
        marginLeft: 15,
    }
});