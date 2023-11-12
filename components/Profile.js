import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import useUser from '../hooks/useUser';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const [selectedCardId, setSelectedCardId] = useState(null);
    const navigation = useNavigation();

    const handleSlotClick = () => {
        navigation.navigate('Binder', {
            selectedCardId,
        });
    };

    return (
        <View style={styles.container}>
            {/* Your existing profile content */}
            <View style={styles.favoriteCardsContainer}>
                {[...Array(5)].map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.favoriteCardSlot}
                        onPress={handleSlotClick}
                    >
                        {selectedCardId ? (
                            <Image style={styles.favoriteCardImage} source={{ uri: selectedCardId.image }} />
                        ) : (
                            <Text>Empty Slot {index + 1}</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    profileEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    favoriteCardsContainer: {
        flexDirection: 'row',
    },
    favoriteCardSlot: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    favoriteCardImage: {
        width: 80,
        height: 80,
        borderRadius: 4,
    },
});

export default Profile;
