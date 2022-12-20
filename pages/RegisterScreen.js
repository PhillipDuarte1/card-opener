import { View, Text, StyleSheet } from 'react-native';
import Register from '../components/Register';

const RegisterScreen = () => {
    return (
        <View style={styles.container}>
            <Register />
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
    }
});