import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from '../utils/firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false); 5

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
                <Text style={emailFocus ? [styles.label, styles.focus] : styles.label}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    onFocus={() => { setEmailFocus(true) }}
                    onBlur={() => { setEmailFocus(false) }}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={passwordFocus ? [styles.label, styles.focus] : styles.label}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    style={styles.input}
                    onFocus={() => { setPasswordFocus(true) }}
                    onBlur={() => { setPasswordFocus(false) }}
                />
                <View style={styles.passwordFooter}>
                    <View style={styles.checkboxContainer}>
                        <Pressable onPress={() => { setChecked(!checked) }}>
                            {checked == false ? <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="gray" />
                                : <MaterialCommunityIcons name="checkbox-marked" size={24} color="gray" />
                            }
                        </Pressable>
                        <Text style={styles.checkboxText}>Remember me?</Text>
                    </View>
                    <TouchableOpacity onPress={() => { console.log('test') }}>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.divider}>
                <Text style={styles.or}>OR</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.socialsContainer}>
                <TouchableOpacity onPress={() => { }} style={[styles.buttonSocial, styles.google]}>
                    <AntDesign name="google" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={[styles.buttonSocial, styles.apple]}>
                    <AntDesign name="apple1" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Apple</Text>
                </TouchableOpacity>
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
        paddingHorizontal: '14.5%',
        paddingVertical: '7%',
    },
    inputContainer: {
        position: 'relative',
        alignSelf: 'center',
        width: '70%',
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 6,
        marginVertical: 10
    },
    label: {
        position: 'absolute',
        top: -11,
        left: 13,
        paddingHorizontal: 6,
        paddingVertical: 1,
        backgroundColor: '#fff',
        fontSize: 14,
        color: 'gray'
    },
    focus: {
        color: 'lightblue'
    },
    input: {
        padding: 13,
        fontSize: 18
    },
    button: {
        alignSelf: 'center',
        width: '50%',
        borderRadius: 8,
        paddingVertical: 16,
        marginVertical: 24,
        color: '#fff',
        backgroundColor: 'gray',
        marginTop: 50
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    },
    divider: {
        padding: 8
    },
    or: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        color: 'darkgray',
        fontSize: 14,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    line: {
        alignSelf: 'center',
        position: 'absolute',
        top: 21,
        zIndex: -1,
        width: '64%',
        height: 1.3,
        backgroundColor: 'darkgray',
    },
    linkContainer: {
        alignSelf: 'center',
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
        alignSelf: 'center'
    },
    buttonSocial: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '25%',
        borderRadius: 8,
        paddingVertical: 16,
        marginHorizontal: 8,
        marginVertical: 16,
        color: '#fff',
        backgroundColor: 'gray'
    },
    google: {
        borderColor: '#db4437'
    },
    apple: {

    },
    checkboxContainer: {
        position: 'absolute',
        bottom: -32,
        left: -4,
        flexDirection: 'row'
    },
    checkboxText: {
        textAlignVertical: 'center',
        paddingTop: 3,
        paddingLeft: 6
    },
    forgot: {
        color: '#555555',
        position: 'absolute',
        bottom: -28,
        right: 0
    },
    passwordFooter: {
        position: 'relative'
    }
});