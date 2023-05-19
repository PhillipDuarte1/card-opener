import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { storage } from '../utils/firebase';
import useCardPacks from '../hooks/useCardPacks';

const Binder = ({ searchQuery, ordering }) => {
  const { packs, loading } = useCardPacks();
  const [message, setMessage] = useState(null);
  const [cards, setCards] = useState([]);
  const [imageURLs, setImageURLs] = useState({});

  useEffect(() => {
    if (!loading) {
      const allCards = packs.flatMap(([packName, pack]) => {
        if (Array.isArray(pack.cards)) {
          return pack.cards.filter(card => card !== undefined);
        }
        return [];
      });

      const filteredCards = allCards.filter(card =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const sortedCards = filteredCards.sort((a, b) => {
        if (ordering === 'lastAcquired') {
          return b.lastAcquired - a.lastAcquired;
        } else if (ordering === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });

      setCards(sortedCards);

      const imageValues = sortedCards.map((card) => card.image);
      const imagePromises = imageValues.map((card) => {
        return storage.ref(`cards/${card}`).getDownloadURL();
      });

      Promise.all(imagePromises).then((urls) => {
        const imageURLMap = imageValues.reduce((acc, image, index) => {
          acc[image] = urls[index];
          return acc;
        }, {});
        setImageURLs(imageURLMap);
      });
    }
  }, [loading, packs, searchQuery, ordering]);

  useEffect(() => {
    if (cards.length === 0) {
      setMessage('No cards have been collected');
    } else {
      setMessage(null);
    }
  }, [cards]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <Text>Loading binder...</Text>
        </View>
      ) : (
        message ? (
          <View>
            <Text>{message}</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.cardContainer}>
            {cards.map((card, index) => {
              return (
                <View key={index} style={styles.cardSleeve}>
                  <View style={styles.card}>
                    {card && (
                      <Image
                        source={{ uri: imageURLs[card.image] }}
                        style={styles.image}
                        resizeMode='cover'
                      />
                    )}
                  </View>
                  <View>
                    <Text>{card.name}</Text>
                    <Text>{card.count}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )
      )}
    </View>
  );
};

export default Binder;

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  cardSleeve: {
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#6C757D',
    borderRadius: 8,
    borderWidth: 2,
    height: 290,
    width: 190,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});