import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db, auth, storage } from '../utils/firebase';

const { width } = Dimensions.get('window');

const AddPack = () => {
  const [packName, setPackName] = useState('');
  const [cards, setCards] = useState([]);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 86 : 0;

  const addCard = () => {
    const newCard = { id: '', name: '', type: '', rate: '', count: 0 };
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const uploadImage = async (index) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const imageResult = await ImagePicker.launchImageLibraryAsync();
    if (!imageResult.canceled) {
      const response = await fetch(imageResult.assets[0].uri);
      const blob = await response.blob();
      const imageName = `card_image_${Date.now()}`;
      const storageRef = storage.ref().child(`pending/${imageName}`);
      await storageRef.put(blob);
      const imageUrl = await storageRef.getDownloadURL();

      const updatedCards = [...cards];
      updatedCards[index].image = imageUrl;
      setCards(updatedCards);
    }
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
    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset} style={styles.container}>
      <TextInput
        style={styles.packName}
        placeholder='Pack Name'
        value={packName}
        onChangeText={setPackName}
      />
      <ScrollView style={styles.scrollContainer}>
        {cards.map((card, index) => (
          <View key={index} style={styles.cardContainer}>
            <TouchableOpacity onPress={() => uploadImage(index)}>
              {card.image ? (
                <Image source={{ uri: card.image }} style={styles.cardImage} />
              ) : (
                <Ionicons name='add-circle-outline' size={70} color='black' style={styles.add} />
              )}
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Card Name</Text>
              <TextInput
                style={styles.input}
                placeholder='Card Name'
                value={card.name}
                onChangeText={(value) => handleCardChange(index, 'name', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Card Type</Text>
              <TextInput
                style={styles.input}
                placeholder='Card Type'
                value={card.type}
                onChangeText={(value) => handleCardChange(index, 'type', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Card Rate</Text>
              <TextInput
                style={styles.input}
                placeholder='Card Rate'
                value={card.rate}
                onChangeText={(value) => handleCardChange(index, 'rate', value)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <Button onPress={addCard} title='Add Card' />
      <Button onPress={submitPack} title='Submit Pack' />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center'
  },
  inputContainer: {
    position: 'relative',
    alignSelf: 'center',
    width: '75%',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 6,
    marginVertical: 10
  },
  label: {
    position: 'absolute',
    top: -11,
    left: 13,
    paddingHorizontal: 6,
    paddingVertical: 1,
    backgroundColor: '#fff',
    fontSize: 14,
    color: 'gray'
  },
  focus: {
    color: 'lightblue'
  },
  input: {
    padding: 13,
    fontSize: 18
  },
  scrollContainer: {
    maxHeight: 640,
    marginVertical: 12
  },
  cardContainer: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4
  },
  cardImage: {
    width: width * 0.6,
    height: 336,
    marginBottom: 22,
    borderRadius: 8,
  },
  packName: {
    fontSize: 30,
    fontWeight: '600',
    color: '#424242',
    alignSelf: 'center'
  },
  add: {
    alignSelf: 'center',
  }
});

export default AddPack;
