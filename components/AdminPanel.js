import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { db } from '../utils/firebase';

const AdminPanel = () => {
    const [pendingPacks, setPendingPacks] = useState([]);

    const timestamp = Date.now();

    useEffect(() => {
        fetchPendingPacks();
    }, []);

    const fetchPendingPacks = async () => {
        try {
            const snapshot = await db.ref('pending').once('value');
            const pendingData = snapshot.val();
            if (pendingData) {
                const packs = Object.entries(pendingData).map(([userId, userPacks]) => ({
                    userId,
                    packs: Object.entries(userPacks).map(([packId, packData]) => ({
                        id: packId,
                        ...packData,
                    })),
                }));
                setPendingPacks(packs);
            }
        } catch (error) {
            console.error('Error fetching pending packs:', error);
        }
    };

    const acceptPack = async (packId) => {
        try {
            const pack = pendingPacks.find((user) => user.packs.some((pack) => pack.id === packId));
            if (pack) {
                const { userId } = pack;
                const acceptedPack = {
                    ...pack.packs.find((pack) => pack.id === packId),
                    addedAt: timestamp,
                };
                await db.ref(`packs/${packId}`).set(acceptedPack);
                await db.ref(`pending/${userId}/${packId}`).remove();

                setPendingPacks((prevPendingPacks) =>
                    prevPendingPacks.map((user) => {
                        if (user.userId === userId) {
                            return {
                                ...user,
                                packs: user.packs.filter((pack) => pack.id !== packId),
                            };
                        }
                        return user;
                    })
                );
            }
        } catch (error) {
            console.error('Error accepting pack:', error);
        }
    };


    const denyPack = async (userId, packId) => {
        try {
            await db.ref(`pending/${userId}/${packId}`).remove();

            setPendingPacks((prevPendingPacks) =>
                prevPendingPacks.map((user) => {
                    if (user.userId === userId) {
                        return {
                            ...user,
                            packs: user.packs.filter((pack) => pack.id !== packId),
                        };
                    }
                    return user;
                })
            );
        } catch (error) {
            console.error('Error denying pack:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Pending Packs</Text>
            <ScrollView>
                {pendingPacks.map((user) => (
                    <View key={user.userId} style={styles.userContainer}>
                        <Text style={styles.userId}>{user.userId}</Text>
                        {user.packs.map((pack) => (
                            <View key={pack.id} style={styles.packContainer}>
                                <Text style={styles.packName}>{pack.packName}</Text>
                                {pack.description && (
                                    <Text style={styles.packDescription}>{pack.description}</Text>
                                )}
                                <ScrollView horizontal={true}>
                                    {pack.cards && Object.values(pack.cards).map((card) => (
                                        <View key={card.id} style={styles.cardContainer}>
                                            <Text style={styles.cardName}>{card.name}</Text>
                                            <Image style={styles.cardImage} source={{ uri: card.image }} />
                                            <ScrollView>
                                                <Text style={styles.cardDescription}>{card.description}</Text>
                                            </ScrollView>
                                        </View>
                                    ))}
                                </ScrollView>
                                <View style={styles.packBottomContainer}>
                                    <Text style={styles.packId}>{pack.id}</Text>
                                    <TouchableOpacity
                                        style={[styles.button, styles.acceptButton]}
                                        onPress={() => acceptPack(pack.id)}
                                    >
                                        <Text style={styles.buttonText}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.denyButton]}
                                        onPress={() => denyPack(user.userId, pack.id)}
                                    >
                                        <Text style={styles.buttonText}>Deny</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default AdminPanel;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 100
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#fff'
    },
    userContainer: {
        marginBottom: 16
    },
    userId: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff'
    },
    packContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12
    },
    packBottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    packName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff'
    },
    packId: {
        fontSize: 8,
        alignSelf: 'flex-end',
        color: '#9c9898'
    },
    packDescription: {
        fontSize: 14,
        color: '#c4c4c4',
        marginBottom: 12
    },
    cardContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        marginRight: 8,
        maxWidth: 200,
        maxHeight: 500
    },
    cardName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff'
    },
    cardDescription: {
        flexWrap: 'wrap',
        color: '#fff'
    },
    cardImage: {
        marginBottom: 4,
        width: 100,
        height: 100
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginHorizontal: 4
    },
    acceptButton: {
        backgroundColor: 'green'
    },
    denyButton: {
        backgroundColor: 'red'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
});