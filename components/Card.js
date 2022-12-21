import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Animated, Easing, Dimensions, PanResponder } from 'react-native';
import { storage } from '../utils/firebase';

const { width } = Dimensions.get('window');

const Card = ({ card }) => {
  const [imageURL, setImageURL] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [flipAnimation] = useState(new Animated.Value(0));
  const [position] = useState(new Animated.ValueXY());
  const shineAnimation = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    storage.ref(card.image).getDownloadURL().then((url) => {
      setImageURL(url);
    });
    shine();
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
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
      <TouchableOpacity onPress={flipCard} activeOpacity={1} style={[styles.card, animatedStyle]}>
        <Animated.View style={[styles.shine, shineStyle]} />
        <Image
          source={{ uri: imageURL }}
          style={styles.image}
          resizeMode='cover'
        />
        {flipped && (
          <View style={styles.backside}>
            <Text style={styles.backsideName}>{card.name}</Text>
          </View>
        )}
        {!flipped && (
          <View style={styles.textContainer}>
            <Text style={styles.rarity}>{card.type}</Text>
            <Text style={styles.name}>{card.name}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: '#6C757D',
    borderRadius: 8,
    borderWidth: 2,
    height: 447.5,
    width: width * 0.8,
    marginBottom: 5,
    overflow: 'hidden'
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
    padding: 10,
    transform: [
      {
        scaleX: -1
      }
    ]
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
  rarity: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    paddingLeft: 8,
    marginTop: 25,
    opacity: .9
  },
  name: {
    maxWidth: '30%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    alignSelf: 'center',
    marginTop: -28,
    marginBottom: 10
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