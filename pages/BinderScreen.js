import { View, StyleSheet } from 'react-native';
import Binder from '../components/Binder';

const BinderScreen = () => {
    return (
        <View style={styles.container}>
            <Binder />
        </View>
    );
};

export default BinderScreen;

const styles = StyleSheet.create({
    container: {
    }
});