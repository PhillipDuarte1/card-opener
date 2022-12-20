import { View, StyleSheet } from 'react-native';
import Login from '../components/Login';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Login />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
    }
});