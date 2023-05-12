import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../utils/firebase';
import CarouselCard from '../components/CarouselCard';
import { ScrollView } from 'react-native-gesture-handler';
import ContentBox from '../components/ContentBox';

// height: Dimensions.get('window').height,
// width: Dimensions.get('window').width,

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
                <View style={styles.contentContainer}>
                    <ScrollView horizontal={true} contentContainerStyle={styles.carouselContainer}>
                        {/* TODO: Make Dynamic currently static amount */}
                        <CarouselCard />
                        <CarouselCard />
                        <CarouselCard />
                        <CarouselCard />
                    </ScrollView>
                    <Text style={styles.headerText}>Recent Packs</Text>
                    <ContentBox />
                    <ContentBox />
                    <ContentBox />
                    <ContentBox />
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
    contentContainer: {
        marginTop: 200,
        marginHorizontal: 30,
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
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },
    headerText: {
        fontSize: 23,
        fontWeight: '500',
        color: '#fef4f4',
        marginVertical: 24
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
    circle: {
        width: 50,
        height: 50,
        marginTop: 10,
        borderRadius: 30,
        backgroundColor: '#fef4f4',
        alignItems: 'center',
        justifyContent: 'center'
    }
});