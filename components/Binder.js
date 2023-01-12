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
                <View style={styles.packNameContainer}>
                  <Text style={styles.packName}>{packName}</Text>
                  <View style={styles.line} />
                  <View style={styles.lineTwo} />
                </View>
                <ScrollView key={packName} horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
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
  },
  packNameContainer: {
    position: 'relative',
    marginTop: 8,
    marginHorizontal: 15
  },
  packName: {
    fontWeight: '700',
    fontSize: 22
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
  line: {
    position: 'absolute',
    bottom: -2,
    left: 18,
    zIndex: -1,
    width: 76,
    height: 1.8,
    backgroundColor: 'darkgray',
  },
  lineTwo: {
    position: 'absolute',
    bottom: -7,
    left: 7,
    zIndex: -1,
    width: 56,
    height: 1.8,
    backgroundColor: 'darkgray',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  scrollView: {
    flexDirection: 'row'
  }
});