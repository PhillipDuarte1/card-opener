import { View, StyleSheet } from 'react-native';
import AdminPanel from '../components/AdminPanel';

const AdminPanelScreen = () => {
    return (
        <View style={styles.container}>
            <AdminPanel />
        </View>
    );
};

export default AdminPanelScreen;

const styles = StyleSheet.create({
    container: {
    }
});