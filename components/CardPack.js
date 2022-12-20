import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { db } from '../utils/firebase';
import Card from './Card';

const CardPack = () => {
  const [cards, setCards] = useState([]);

  const openPack = () => {
    db.ref('cards').once('value', (snapshot) => {
      const cards = snapshot.val();
      const cardArray = Object.values(cards);
      const selectedCards = [];
      let totalRate = 0;

      for (const card of cardArray) {
        totalRate += card.rate;
      }

      for (let i = 0; i < 5; i++) {
        const randomNumber = Math.random() * 100;
        let cardType = 'common';
        let cumulativeRate = 0;

        for (const card of cardArray) {
          const normalizedRate = (card.rate / totalRate) * 100;
          // console.log(normalizedRate);
          cumulativeRate += normalizedRate;
          if (randomNumber <= cumulativeRate) {
            cardType = card.type;
            break;
          }
        }

        const filteredCards = cardArray.filter((card) => card.type === cardType);
        const randomIndex = Math.floor(Math.random() * filteredCards.length);
        const selectedCard = filteredCards[randomIndex];

        selectedCards.push(selectedCard);
      }
      setCards([]);
      setCards(selectedCards);
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={openPack} title="Open Card Pack" />
      <View style={styles.cardContainer}>
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </View>
    </View>
  );
};

export default CardPack;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  scrollView: {
    paddingVertical: 30,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 55,
  },
  cardContainer: {
  },
});