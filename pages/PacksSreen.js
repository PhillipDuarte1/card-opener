import { View, Text, StyleSheet } from 'react-native';
import CardPack from '../components/CardPack';

const PacksScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <CardPack packName={'Test'} />
            <Text>Haha</Text>
            <CardPack packName={'Test2'} />
        </View>
    );
};

export default PacksScreen;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginTop: '15%',
        alignItems: 'center'
    }
});