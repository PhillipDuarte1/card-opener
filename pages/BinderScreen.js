import { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import Binder from '../components/Binder';
import Search from '../components/Search';

const BinderScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [ordering, setOrdering] = useState('lastAcquired');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleOrder = (order) => {
        setOrdering(order);
    };
    return (
        <View style={styles.container}>
            <Search onSearch={handleSearch} onOrder={handleOrder} />
            <Binder searchQuery={searchQuery} ordering={ordering} />
        </View>
    );
};

export default BinderScreen;

const styles = StyleSheet.create({
    container: {
    }
});