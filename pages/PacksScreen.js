import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useUser from '../hooks/useUser';
import CardPack from '../components/CardPack';
import Header from '../components/Header';
import { db } from '../utils/firebase';

const PacksScreen = ({ navigation }) => {
    const [packs, setPacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPacks = async () => {
            db.ref('packs').on('value', (snapshot) => {
                const allPacks = snapshot.val();
                if (allPacks) {
                    const packArray = Object.entries(allPacks);
                    setPacks(packArray);
                }
                setLoading(false);
            });
        };

        fetchPacks();
    }, []);

    const user = useUser();

    return (
        <View style={styles.container}>
            <Header navigation={navigation} user={user} />
            <View style={styles.contentContainer}>
                {loading ? (
                    <Text>Loading packs...</Text>
                ) : (
                    packs.map((pack, i) => <CardPack key={i} packName={pack[0]} />)
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