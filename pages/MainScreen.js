import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { auth } from '../utils/firebase';

const MainScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerMain}>Welcome,</Text>
                <Text style={styles.headerSub}>Get access to exclusive packs and features by creating an account</Text>
            </View>
            {/* {user ? ( */}
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Packs')} style={styles.button}>
                        <Text>Open Packs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Binder')}>
                        <Text>View Binder</Text>
                    </TouchableOpacity>
                </View>
            {/* ) : ( */}
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            {/* )
            } */}
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
    }
});