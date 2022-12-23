import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../utils/firebase';
import Card from './Card';

const Binder = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.ref(`users/${user.uid}/cards`).on('value', (snapshot) => {
          const userCards = snapshot.val();
          setCards(userCards);
          setLoading(false);
        });
      } else {
        setCards([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading binder...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card card={item} />}
      />
    </View>
  );
};

export default Binder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
