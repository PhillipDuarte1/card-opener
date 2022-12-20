import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../utils/firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: ''
        })
    }, []);

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password).then(() => {
            navigation.navigate('Main')
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title='or Register' onPress={() => navigation.navigate('RegisterScreen')} />
        </View>
    );
};

export default Login;