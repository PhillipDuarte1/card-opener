import { View, StyleSheet } from 'react-native';
import AddPack from '../components/AddPack';
import useUser from '../hooks/useUser';
import Header from '../components/Header';

const AddPackScreen = ({ navigation }) => {
    const user = useUser();
    return (
        <View style={styles.container}>
            <Header navigation={navigation} user={user} />
            <View style={styles.contentContainer}>
                <AddPack />
            </View>
        </View>
    );
};

export default AddPackScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2e2828',
        height: '100%'
    },
    contentContainer: {
        marginTop: 200,
    }
});