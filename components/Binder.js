import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { auth, db, storage } from '../utils/firebase';

const Binder = () => {
  const [cards, setCards] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.ref(`users/${user.uid}/collection`).on('value', (snapshot) => {
          const userCards = snapshot.val();
          const cardArray = Object.values(userCards);

          setCards(cardArray);
          setLoading(false);
        });
      } else {
        setCards([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const imagePromises = cards.map((card) => {
      return storage.ref(`cards/${card.image}`).getDownloadURL();
    });

    Promise.all(imagePromises).then((urls) => {
      setImageURLs(urls);
    });
  }, [cards]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.container}>
          <Text>Loading binder...</Text>
        </View>
      ) : (
        cards.map((card, index) => {
          return (
            <View key={index}>
              <View style={styles.card}>
                <Image
                  source={{ uri: imageURLs[index] }}
                  style={styles.image}
                  resizeMode='cover'
                />
              </View>
              <View>
                <Text>{card.name}</Text>
                <Text>{card.count}</Text>
              </View>
            </View>
          )
        })
      )}
    </View>
  );
};

export default Binder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#6C757D',
    borderRadius: 8,
    borderWidth: 2,
    height: 200,
    width: 150,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});