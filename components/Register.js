import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, storage } from '../utils/firebase';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(undefined);
    const [image, setImage] = useState(null);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            // headerLeft: () => <View></View>,
            title: 'Register'
        });
    }, []);

    const handleRegister = () => {
        if (!email || !password) {
            return Alert.alert('Invalid Registration', 'Email and Password cannot be Empty');
        } else {
            auth.createUserWithEmailAndPassword(email, password).then((user) => {
                user.user.updateProfile({
                    displayName: username[0].toUpperCase() + username.slice(1),
                    photoURL: image
                })
            }).then(() => {
                navigation.navigate('Login');
            }).catch(error => {
                console.log(error);
            });
        }
    };

    const handleSelectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Account</Text>
            <View style={styles.imageUploadContainer}>
                <TouchableOpacity onPress={handleSelectImage}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.userIconContainer}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.userIconImage} />
                            ) : (
                                <AntDesign name="user" size={60} color="gray" />
                            )}
                        </View>
                        <View style={styles.cameraIconContainer}>
                            <MaterialCommunityIcons name="camera-plus-outline" size={18} color="gray" />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.inputContainer}>
                    <Text style={usernameFocus ? [styles.label, styles.focus] : styles.label}>Username</Text>
                    <TextInput
                        value={username}
                        onChangeText={text => setUsername(text)}
                        maxLength={10}
                        style={styles.input}
                        onFocus={() => { setUsernameFocus(true) }}
                        onBlur={() => { setUsernameFocus(false) }}
                    />
                    <Text style={styles.charCount}>{username ? username.length : 0}/10</Text>
                </View>
            </View>
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
            </View>
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.divider}>
                <Text style={styles.or}>OR</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.socialsContainer}>
                <TouchableOpacity onPress={handleRegister} style={[styles.buttonSocial, styles.google]}>
                    <AntDesign name="google" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRegister} style={[styles.buttonSocial, styles.apple]}>
                    <AntDesign name="apple1" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Apple</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    charCount: {
        position: 'absolute',
        bottom: -11,
        right: 8,
        paddingHorizontal: 6,
        paddingVertical: 1,
        backgroundColor: '#fff',
        color: '#000'
    },
    imageUploadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 27
    },
    avatarContainer: {
        position: 'relative'
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 6,
        right: 0,
        borderWidth: 2,
        borderColor: 'gray',
        padding: 6,
        borderRadius: 18,
        backgroundColor: 'lightgray'
    },
    userIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 100,
        backgroundColor: 'lightgray',
        overflow: 'hidden'
    },
    userIconImage: {
        width: 120,
        height: 120,
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
    button: {
        alignSelf: 'center',
        width: '50%',
        borderRadius: 8,
        paddingVertical: 16,
        marginVertical: 24,
        color: '#fff',
        backgroundColor: 'gray'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    },
    socialsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
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
    }
});

export default Register;