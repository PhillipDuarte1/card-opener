import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { auth, db, storage } from '../utils/firebase';

const Binder = () => {
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [imageURLs, setImageURLs] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.ref(`users/${user.uid}/collection`).on('value', (snapshot) => {
          if (snapshot.val() != null) {
            const userPacks = snapshot.val();
            const packArray = Object.entries(userPacks);

            setMessage(null);
            setPacks(packArray);
            setLoading(false);
          } else {
            setMessage('No cards have been collected');
            setPacks([]);
            setLoading(false);
          }
        });
      } else {
        setPacks([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      const imageValues = packs.flatMap(([packName, pack]) => {
        return pack.cards.filter(card => card !== undefined).map((card) => {
          return card.image;
        });
      });

      const imagePromises = imageValues.map((card) => {
        return storage.ref(`cards/${card}`).getDownloadURL();
      });

      Promise.all(imagePromises).then((urls) => {
        const imageURLMap = imageValues.reduce((acc, image, index) => {
          acc[image] = urls[index];
          return acc;
        }, {});
        setImageURLs(imageURLMap);
      });
    }
  }, [loading, packs]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <Text>Loading binder...</Text>
        </View>
      ) : (
        message ? (
          <View>
            <Text>{message}</Text>
          </View>
        ) : (
          packs.map(([packName, pack], index) => {
            return (
              <View key={index}>
                <Text style={styles.packName}>{packName}</Text>
                <ScrollView key={packName} horizontal={true} style={styles.scrollView}>
                  {pack.cards.map((card, index) => {
                    return (
                      <View key={index} style={styles.cardSleeve}>
                        <View style={styles.card}>
                          {card && (
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
                    )
                  })}
                </ScrollView>
              </View>
            )
          })
        )
      )}
    </View>
  );
};

export default Binder;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row'
  },
  cardSleeve: {
    margin: 15
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
  },
  scrollView: {
    flexDirection: 'row'
  }
});