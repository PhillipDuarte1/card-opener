import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { storage } from '../utils/firebase';
import useCardPacks from '../hooks/useCardPacks';
import Loading from './Loading';

const { width, height } = Dimensions.get('window');

const Binder = ({ searchQuery, ordering }) => {
  const { packs, loading } = useCardPacks();
  const [message, setMessage] = useState(null);
  const [cards, setCards] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  const [orderBy, sortOrder] = ordering.split(':');
  const [isLoading, setIsLoading] = useState([]);

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

      const sortedCards = filteredCards.sort((card1, card2) => {
        if (orderBy === 'name') {
          return sortOrder === 'asc' ? card1.name.localeCompare(card2.name) : card2.name.localeCompare(card1.name);
        } else if (orderBy === 'lastAcquired') {
          return sortOrder === 'asc' ? card1.lastAcquired - card2.lastAcquired : card2.lastAcquired - card1.lastAcquired;
        }
        return card1.name.localeCompare(card2.name);
      });

      setCards(sortedCards);

      const imageValues = sortedCards.map((card) => card.image);
      const imagePromises = imageValues.map((card) => {
        return storage.ref(`cards/${card}`).getDownloadURL()
          .then(url => {
            const updatedLoading = [...isLoading];
            updatedLoading[imageValues.indexOf(card)] = false;
            setIsLoading(updatedLoading);

            return url;
          });
      });

      setIsLoading(new Array(sortedCards.length).fill(true));

      Promise.all(imagePromises)
        .then((urls) => {
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

  const totalHeight = height + cards.length + 300;

  return (
    <View style={styles.container}>
      {message ? (
        <View>
          <Text style={styles.message}>{message}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={[styles.cardContainer, { height: totalHeight }]}>
          {cards.map((card, index) => {
            return (
              <View key={index} style={styles.cardSleeve}>
                <View style={styles.card}>
                  {isLoading[index] ? (
                    <Loading size='small' color='#000' />
                  ) : (
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
      )}
    </View>
  );
};

export default Binder;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    zIndex: -1
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
