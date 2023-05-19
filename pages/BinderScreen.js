import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Binder from '../components/Binder';
import Search from '../components/Search';
import Header from '../components/Header';
import useUser from '../hooks/useUser';

const BinderScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [ordering, setOrdering] = useState('lastAcquired');

    const user = useUser();

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleOrder = (order) => {
        setOrdering(order);
    };
    return (
        <View style={styles.container}>
            <Header navigation={navigation} user={user} />
            <View style={styles.contentContainer}>
                <Search onSearch={handleSearch} onOrder={handleOrder} />
                <Binder searchQuery={searchQuery} ordering={ordering} />
            </View>
        </View>
    );
};

export default BinderScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2e2828'
    },
    contentContainer: {
        marginTop: 200
    }
});