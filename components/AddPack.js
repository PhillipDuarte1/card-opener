import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db, auth } from '../utils/firebase';

const AddPack = () => {
  const [packName, setPackName] = useState('');
  const [cards, setCards] = useState([]);

  const addCard = () => {
    const newCard = { id: '', name: '', type: '', rate: '', count: 0 };
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const submitPack = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const packData = {
          id: packName,
          cards: {},
        };

        cards.forEach((card) => {
          const cardRef = db.ref(`pending/${user.uid}/packs/${packName}/cards`).push();
          const cardId = cardRef.key;

          card.id = cardId;
          packData.cards[cardId] = card;
        });

        db.ref(`pending/${user.uid}/packs/${packName}`).set(packData)
          .then(() => {
            setPackName('');
            setCards([]);
            alert('Pack Added For Review');
          })
          .catch((error) => {
            alert(error);
          });
      }
    });
  };

  return (
    <View>
      <TextInput
        placeholder='Pack Name'
        value={packName}
        onChangeText={setPackName}
      />

      {cards.map((card, index) => (
        <View key={index}>
          <TextInput
            placeholder='Card Name'
            value={card.name}
            onChangeText={(value) => handleCardChange(index, 'name', value)}
          />

          <TextInput
            placeholder='Card Type'
            value={card.type}
            onChangeText={(value) => handleCardChange(index, 'type', value)}
          />

          <TextInput
            placeholder='Card Rate'
            value={card.rate}
            onChangeText={(value) => handleCardChange(index, 'rate', value)}
          />
        </View>
      ))}
      <Button onPress={addCard} title='Add Card' />
      <Button onPress={submitPack} title='Submit Pack' />
    </View>
  );
};

export default AddPack;