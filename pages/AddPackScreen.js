import { View, StyleSheet } from 'react-native';
import AddPack from '../components/AddPack';

const AddPackScreen = () => {
    return (
        <View style={styles.container}>
            <AddPack />
        </View>
    );
};

export default AddPackScreen;

const styles = StyleSheet.create({
    container: {
    }
});