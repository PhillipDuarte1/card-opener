import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { db, auth } from '../utils/firebase';
import Card from './Card';

const CardPack = ({ packName }) => {
  const [cards, setCards] = useState([]);

  const openPack = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.ref(`users/${user.uid}/collection/${packName}/cards`).once('value', (snapshot) => {
          const collection = snapshot.val() || {};
          const collectionArray = Object.values(collection);
          db.ref(`packs/${packName}/cards`).once('value', (snapshot) => {
            const cards = snapshot.val();
            const cardArray = Object.values(cards);
            const selectedCards = [];
            let totalRate = 0;

            for (const card of cardArray) {
              totalRate += card.rate;
            }

            const timestamp = Date.now();

            for (let i = 0; i < 5; i++) {
              const randomNumber = Math.random() * 100;
              let cardType = 'common';
              let cumulativeRate = 0;

              for (const card of cardArray) {
                const normalizedRate = (card.rate / totalRate) * 100;
                cumulativeRate += normalizedRate;
                if (randomNumber <= cumulativeRate) {
                  cardType = card.type;
                  break;
                }
              }

              const filteredCards = cardArray.filter((card) => card.type === cardType);
              const randomIndex = Math.floor(Math.random() * filteredCards.length);
              const selectedCard = filteredCards[randomIndex];

              let cardExists = false;
              let existingCard;
              for (const card of collectionArray) {
                if (card.id === selectedCard.id) {
                  cardExists = true;
                  existingCard = card;
                  break;
                }
              }

              if (cardExists) {
                existingCard.count += 1;
                selectedCard.count = existingCard.count;
              } else {
                selectedCard.count = selectedCards.filter(card => card.id === selectedCard.id).length + 1;
              }

              selectedCard.lastAcquired = timestamp + i;
              selectedCards.push(selectedCard);
            }

            for (const card of selectedCards) {
              db.ref(`users/${user.uid}/collection/${packName}/cards/${card.id}`).set(card);
            }
            setCards([]);
            setCards(selectedCards);
          }).then(() => {

          });
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={openPack} title='Open Card Pack' />
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
    // width: '100%',
    // height: '100%'
  },
  cardContainer: {
  },
});