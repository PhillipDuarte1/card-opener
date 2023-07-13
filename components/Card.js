import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Animated, Easing, Dimensions, PanResponder } from 'react-native';
import { storage } from '../utils/firebase';
import Loading from './Loading';

const { width } = Dimensions.get('window');

const Card = ({ card, draggable, size = 'default' }) => {
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [flipAnimation] = useState(new Animated.Value(0));
  const [position] = useState(new Animated.ValueXY());
  const shineAnimation = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    storage.ref(`cards/${card.image}`).getDownloadURL().then((url) => {
      setImageURL(url);
    }).then(() => {
      setLoading(false);
    });
    shine();
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => draggable,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: position.x,
        dy: position.y,
      },
    ], { useNativeDriver: false }),
    onPanResponderRelease: (event, gesture) => {
      if (Math.abs(gesture.dx) > width * 0.2) {
        Animated.timing(position, {
          toValue: {
            x: gesture.dx > 0 ? width : -width,
            y: 0,
          },
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const shine = () => {
    let delay;
    if (card.type === 'rare') {
      delay = 1500;
    } else if (card.type === 'very rare') {
      delay = 500;
    } else {
      delay = 100;
    }
    Animated.timing(shineAnimation, {
      toValue: 390,
      duration: 1200,
      delay: delay,
      useNativeDriver: true
    }).start(() => {
      shineAnimation.setValue(-100);
      shine();
    });
  };


  const opacity = shineAnimation.interpolate({
    inputRange: [0, 150, 390],
    outputRange: [.02, .08, .01],
  });

  const shineStyle = {
    transform: [
      {
        translateX: card.type === 'common' || card.type === 'uncommon' ? 0 : shineAnimation,
      },
      {
        translateY: card.type === 'common' || card.type === 'uncommon' ? 0 : shineAnimation
      },
      {
        rotate: '45deg'
      }
    ],
    opacity: card.type === 'common' || card.type === 'uncommon' ? 0 : opacity,
  };

  const flipCard = () => {
    Animated.timing(
      flipAnimation,
      {
        toValue: flipped ? 0 : 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start();
    setFlipped(!flipped);
  };

  const flipInterpolation = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const cardWidth = size === 'default' ? width * 0.8 : size.width;
  const cardHeight = cardWidth * 1.45;

  const animatedStyle = {
    transform: [
      {
        rotateY: flipInterpolation
      }
    ]
  };

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: position.x },
          { translateY: position.y },
        ],
      }}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity onPress={flipCard} activeOpacity={1} style={[size === 'default' ? styles.cardAbsolute : styles.card, { width: cardWidth, height: cardHeight }, animatedStyle]}>
        <Animated.View style={[styles.shine, shineStyle]} />
        {loading && (
          <Loading color='#000' size='large' />
        )}
        {flipped ? (
          <View style={styles.backContainer}>
            <Image
              source={{ uri: imageURL }}
              style={[styles.image, styles.backImage]}
              resizeMode='cover'
            />
            <View style={styles.backContent}>
              <View style={styles.statsContainer}>
                <View style={styles.statsColumn}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Author:</Text>
                    <Text style={styles.statValue}>{card.author}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Defense:</Text>
                    <Text style={styles.statValue}>{card.defense}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>ID:</Text>
                    <Text style={styles.statValue}>{card.id}</Text>
                  </View>
                </View>
                <View style={styles.statsColumn}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Rarity:</Text>
                    <Text style={styles.statValue}>{card.type}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Element:</Text>
                    <Text style={styles.statValue}>{card.element}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Number:</Text>
                    <Text style={styles.statValue}>{card.pulledGlobalCount}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.description}>{card.description}</Text>
            </View>
          </View>
        ) : (
          <View>
            <Image
              source={{ uri: imageURL }}
              style={styles.image}
              resizeMode='cover'
            />
            <View style={styles.textContainer}>
              {/* <Text style={styles.rarity}>{card.type}</Text> */}
              <Text style={styles.name}>{card.name}</Text>
              {/* <Text style={styles.number}>{card.pulledGlobalCount}</Text> */}
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: '#6C757D',
    borderRadius: 8,
    borderWidth: 2,
    overflow: 'hidden'
  },
  cardAbsolute: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: '#6C757D',
    borderRadius: 8,
    borderWidth: 2,
    overflow: 'hidden'
  },
  backImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3
  },
  backContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transform: [
      {
        scaleX: -1
      }
    ]
  },
  backContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  statsColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  statItem: {
    marginBottom: 8
  },
  statLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  description: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6
  },
  backside: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    padding: 10
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  rarity: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    opacity: 0.9,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8
  },
  number: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    position: 'absolute',
    top: 8,
    right: 8,
  },
  backsideName: {
    fontSize: 42,
  },
  shine: {
    position: 'absolute',
    top: -220,
    zIndex: 1,
    width: 30,
    height: '130%',
    borderWidth: 40,
    borderColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 40
  }
});