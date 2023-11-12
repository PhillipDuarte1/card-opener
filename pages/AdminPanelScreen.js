import { View, StyleSheet } from 'react-native';
import AdminPanel from '../components/AdminPanel';
import useUser from '../hooks/useUser';
import Header from '../components/Header';

const AdminPanelScreen = ({ navigation }) => {
    const user = useUser();
    return (
        <View style={styles.container}>
            <Header navigation={navigation} user={user} />
            <View style={styles.contentContainer}>
                <AdminPanel />
            </View>
        </View>
    );
};

export default AdminPanelScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2e2828',
        height: '100%'
    },
    contentContainer: {
        marginTop: 200
    },
});