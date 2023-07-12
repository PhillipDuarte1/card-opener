import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { storage } from '../utils/firebase';
import useCardPacks from '../hooks/useCardPacks';
import Loading from './Loading';
import Card from './Card';

const Binder = ({ searchQuery, ordering }) => {
  const { packs, loading } = useCardPacks();
  const [cards, setCards] = useState([]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cards, searchQuery]);

  const sortedCards = useMemo(() => {
    const [field, order] = ordering.split(':');

    return filteredCards.sort((card1, card2) => {
      if (field === 'name') {
        return order === 'asc'
          ? card1.name.localeCompare(card2.name)
          : card2.name.localeCompare(card1.name);
      } else if (field === 'lastAcquired') {
        return order === 'asc'
          ? card1.lastAcquired - card2.lastAcquired
          : card2.lastAcquired - card1.lastAcquired;
      }
      return 0;
    });
  }, [filteredCards, ordering]);

  useEffect(() => {
    if (!loading && packs.length > 0) {
      const allCards = Object.values(packs[0][1]).flatMap((cards) => {
        return cards;
      });
      setCards(allCards);
    }
  }, [loading, packs]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading color='#000' size='large' />
      ) : (
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {sortedCards.length === 0 ? (
            <Text style={styles.message}>No cards have been collected</Text>
          ) : (
            sortedCards.map((card) => (
              <View style={styles.cardSleeve} key={card.uid}>
                <Card card={card} draggable={false} size={{ width: 200, height: 300 }} />
              </View>
            ))
          )}
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
    justifyContent: 'center'
  },
  message: {
    fontSize: 18,
    color: '#fef4f4',
    alignSelf: 'center'
  },
  cardSleeve: {
    margin: 4.4
  }
});