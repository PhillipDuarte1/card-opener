import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db, auth } from '../utils/firebase';

const AddPack = () => {
  const [packName, setPackName] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardRate, setCardRate] = useState('');

  const addSingleCard = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const newCard = { name: cardName, type: cardType, rate: cardRate, count: 0 };
        db.ref(`pending/${user.uid}/packs/${packName}/cards`)
          .push(newCard)
          .then(() => {
            setPackName('');
            setCardName('');
            setCardType('');
            setCardRate('');
            alert('Card added to pending pack');
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
        placeholder="Pack Name"
        value={packName}
        onChangeText={setPackName}
      />
      <TextInput
        placeholder="Card Name"
        value={cardName}
        onChangeText={setCardName}
      />
      <TextInput
        placeholder="Card Type"
        value={cardType}
        onChangeText={setCardType}
      />
      <TextInput
        placeholder="Card Rate"
        value={cardRate}
        onChangeText={setCardRate}
      />
      <Button onPress={addSingleCard} title="add single card to pack" />
    </View>
  );
};

export default AddPack;