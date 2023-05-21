import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardPack from '../components/CardPack';
import Header from '../components/Header';
import useCardPacks from '../hooks/useCardPacks';
import useUser from '../hooks/useUser';

const PacksScreen = ({ navigation }) => {
    const { packs, loading } = useCardPacks();

    const user = useUser();

    packs.map((pack, i) => {
        console.log(pack[0])
    })
    return (
        <View style={styles.container}>
            <Header navigation={navigation} user={user} />
            <View style={styles.contentContainer}>
                {loading ? (
                    <Text>Loading packs...</Text>
                ) : (
                    packs.map((pack, i) => (
                        <CardPack key={i} packName={pack[0]} />
                    ))
                )}
            </View>
        </View>
    );
};

export default PacksScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2e2828',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    contentContainer: {
        marginTop: 200,
    },
});