import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { db, auth } from '../utils/firebase';
import Card from './Card';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const CardPack = ({ packName }) => {
  const [cards, setCards] = useState([]);

  const openPack = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.ref(`packs/${packName}/cards`).once('value', (snapshot) => {
          const cards = snapshot.val();
          const cardArray = Object.values(cards);
          const selectedCards = [];
          const timestamp = Date.now();
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
              cumulativeRate += normalizedRate;
              if (randomNumber <= cumulativeRate) {
                cardType = card.type;
                break;
              }
            }

            const filteredCards = cardArray.filter((card) => card.type === cardType);
            const randomIndex = Math.floor(Math.random() * filteredCards.length);
            const selectedCard = filteredCards[randomIndex];

            const pulledGlobalCountRef = db.ref(`packs/${packName}/cards/${selectedCard.id}/globalCount`);

            pulledGlobalCountRef.transaction((currentCount) => (currentCount || 0) + 1, (err, committed, snapshot) => {
              if (committed) {
                const pulledGlobalCount = snapshot.val();

                const newCard = {
                  ...selectedCard,
                  uid: uuidv4(),
                  packName: packName,
                  lastAcquired: timestamp + i,
                  pulledGlobalCount: pulledGlobalCount,
                };

                selectedCards.push(newCard);

                if (selectedCards.length === 5) {
                  for (const card of selectedCards) {
                    const { globalCount, ...cardData } = card;
                    db.ref(`users/${user.uid}/collection/cards/${cardData.uid}`).set(cardData);
                  }
                  setCards(selectedCards);
                }
              }
            });
          }
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={openPack} title='Open Card Pack' />
      <View style={styles.cardContainer}>
        {cards.map((card) => (
          <Card key={card.uid} card={card} />
        ))}
      </View>
    </View>
  );
};

export default CardPack;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardContainer: {},
});