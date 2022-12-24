import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from '../utils/firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: ''
        })
    }, []);

    const handleLogin = async () => {
        await auth.signInWithEmailAndPassword(email, password).then((user) => {
            if (checked) {
                // auth.onAuthStateChanged(async (user) => {
                //     if (user) {
                //         const token = await user.getIdToken();
                //         await AsyncStorage.setItem('token', token).then(() => {
                //         });
                //     }
                // });
            }
            navigation.navigate('Main');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <View style={styles.checkboxContainer}>
                    <Pressable onPress={() => { setChecked(!checked) }}>
                        {checked == false ? <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
                            : <MaterialCommunityIcons name="checkbox-marked" size={24} color="black" />
                        }
                    </Pressable>
                    <Text style={styles.checkboxText}>Remember me?</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { console.log('test') }}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.divider}>
                <Text style={styles.or}>OR</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.socialsContainer}>
                <View style={[styles.circle, styles.google]}>
                    <FontAwesome name='google' size={30} color='#db4437' />
                </View>
                <View style={[styles.circle, styles.facebook]}>
                    <FontAwesome name='facebook' size={30} color='#4267b2' />
                </View>
                <View style={[styles.circle, styles.phone]}>
                    <FontAwesome name='phone' size={30} color='black' />
                </View>
            </View>
            <View style={styles.linkContainer}>
                <Text style={styles.linkText}>
                    Need an account?&nbsp;
                    <Text onPress={() => navigation.navigate('Register')} style={styles.link}>Register</Text>
                </Text>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 22,
        fontWeight: '500',
        color: '#555555',
        paddingHorizontal: '12.5%',
        paddingVertical: '7%',
    },
    inputContainer: {
        marginVertical: 15
    },
    label: {
        fontSize: 17,
        fontWeight: '500',
        color: '#555555',
        paddingHorizontal: '13%',
        marginBottom: 4
    },
    input: {
        alignSelf: 'center',
        width: '75%',
        borderWidth: 2,
        borderColor: '#bebebe',
        borderRadius: 8,
        padding: 16,
        fontSize: 18,
        color: '#222e5a'
    },
    button: {
        alignSelf: 'center',
        width: '76%',
        borderRadius: 12,
        paddingVertical: 16,
        marginVertical: 8,
        color: '#fff',
        backgroundColor: '#222e5a',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff'
    },
    forgot: {
        alignSelf: 'flex-end',
        paddingRight: '13%',
        marginTop: 2,
        color: '#555555'
    },
    divider: {
        padding: 16
    },
    or: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        color: '#bebebe',
        fontSize: 22,
        padding: 4,
        borderWidth: 1.5,
        borderColor: '#bebebe',
        borderRadius: 8
    },
    line: {
        alignSelf: 'center',
        position: 'absolute',
        top: 34,
        bottom: 0,
        zIndex: -1,
        width: '80%',
        height: 1.5,
        backgroundColor: '#bebebe',
    },
    linkContainer: {
        alignSelf: 'center',
        // width: '76%',
        borderRadius: 12,
        paddingVertical: 16,
        marginVertical: 8
    },
    link: {
        textDecorationLine: 'underline',
        textTransform: 'uppercase'
    },
    linkText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#555555'
    },
    socialsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    circle: {
        alignItems: 'center',
        padding: 15,
        width: 70,
        height: 70,
        borderWidth: 5,
        borderRadius: 100
    },
    google: {
        borderColor: '#db4437'
    },
    facebook: {
        borderColor: '#4267b2'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingLeft: '12%',
        marginTop: 12
    },
    checkboxText: {
        textAlignVertical: 'center',
        paddingTop: 3,
        paddingLeft: 6
    }
});