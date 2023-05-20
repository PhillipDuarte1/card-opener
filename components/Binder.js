import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { storage } from '../utils/firebase';
import useCardPacks from '../hooks/useCardPacks';

const { width, height } = Dimensions.get('window');

const Binder = ({ searchQuery, ordering }) => {
  const { packs, loading } = useCardPacks();
  const [message, setMessage] = useState(null);
  const [cards, setCards] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  const [orderBy, sortOrder] = ordering.split(':');

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
        if (orderBy === 'lastAcquired') {
          return sortOrder === 'asc' ? a.lastAcquired - b.lastAcquired : b.lastAcquired - a.lastAcquired;
        } else if (orderBy === 'name') {
          return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
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
  }, [packs, searchQuery, ordering]);

  useEffect(() => {
    if (cards.length === 0) {
      setMessage('No cards have been collected');
    } else {
      setMessage(null);
    }
  }, [cards]);

  // Calculate the total height of the cardContainer
  const totalHeight = height + cards.length * 60; // Assuming each card has a height of 300

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <Text>Loading binder...</Text>
        </View>
      ) : (
        message ? (
          <View>
            <Text style={styles.message}>{message}</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={[styles.cardContainer, { height: totalHeight }]}>
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
  cardSleeve: {},
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
  },
  message: {
    fontSize: 18,
    color: '#fef4f4',
    alignSelf: 'center'
  }
});
