import { View, Text, StyleSheet } from 'react-native';
import CardPack from '../components/CardPack';

const PacksScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <CardPack />
        </View>
    );
};

export default PacksScreen;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        marginTop: '15%',
        alignItems: 'center'
    }
});