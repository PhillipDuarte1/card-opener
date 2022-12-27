import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../utils/firebase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(undefined);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <View />,
            title: 'Register'
        });
    }, []);

    const handleRegister = () => {
        if (!email || !password) {
            return Alert.alert('Invalid Registration', 'Email and Password cannot be Empty');
        } else {
            auth.createUserWithEmailAndPassword(email, password).then((user) => {
                user.user.updateProfile({
                    displayName: username[0].toUpperCase() + username.slice(1)
                })
            }).then(() => {
                navigation.navigate('Login');
            }).catch(error => {
                console.log(error);
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text>Create Account</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    maxLength={10}
                    style={styles.input}
                />
                {/* <Text style={ styles.charCount }>{username ? 20 - username.length: 20} characters left</Text> */}
                <Text style={styles.charCount}>{username ? username.length : 0}/10</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    style={styles.input}
                />
            </View>
            <Button title='Register' onPress={handleRegister} />
            <Button title='Back to Login' onPress={() => navigation.pop()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    header: {
        // textAlign: 'center'
    },
    inputContainer: {
        position: 'relative',
        paddingBottom: 12,
        marginTop: 15
    },
    label: {
        paddingHorizontal: '15%'
    },
    input: {
        alignSelf: 'center',
        width: '70%',
        borderBottomWidth: 2,
        borderColor: '#42AAC4',
        paddingTop: 14,
        paddingBottom: 8,
        paddingRight: 14,
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 18
    },
    charCount: {
        position: 'absolute',
        bottom: 0,
        right: '14.5%',
        color: '#C27579'
    }
});

export default Register;