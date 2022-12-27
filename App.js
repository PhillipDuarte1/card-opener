import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from './utils/firebase';
import MainScreen from './pages/MainScreen';
import PacksScreen from './pages/PacksSreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import BinderScreen from './pages/BinderScreen';

export default function App() {
  const [user, setUser] = useState(null);

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const MyStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Packs' component={PacksScreen} />
        <Stack.Screen name='Binder' component={BinderScreen} />
      </Stack.Navigator>
    )
  }

  const DrawerContent = (props) => {
    return (
      <View {...props} style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.image}
          />
          {user ? (
            <View style={styles.userInfoContainer}>
              <Text style={styles.userUsername}>{user.displayName}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <ScrollView style={styles.drawerItemContainer}>
          <DrawerItem
            label='Home'
            icon={() => (<FontAwesome name='home' size={24} color='black' />)}
            onPress={() => props.navigation.navigate('Home')}
            style={[styles.item, styles.firstChild]}
          />
          <DrawerItem
            label='Packs'
            icon={() => (<MaterialCommunityIcons name='cards' size={24} color='black' />)}
            onPress={() => props.navigation.navigate('Packs')}
            style={styles.item}
          />
          <DrawerItem
            label='Binder'
            icon={() => (<MaterialCommunityIcons name="view-grid" size={24} color="black" />)}
            onPress={() => props.navigation.navigate('Binder')}
            style={styles.item}
          />
          <DrawerItem
            label='Settings'
            icon={() => (<FontAwesome name="gear" size={24} color="black" />)}
            onPress={() => props.navigation.navigate('Settings')}
            style={styles.item}
          />
        </ScrollView>
         <View style={styles.footer}>
          <DrawerItem
            label='Logout'
            icon={() => (<MaterialCommunityIcons name="logout" size={24} color="black" />)}
            onPress={() => props.navigation.navigate('Logout')}
          />
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home' drawerContent={(props) => <DrawerContent {...props} />} >
        <Drawer.Screen
          name='Home'
          options={{ headerShown: false }}
          component={MyStack}
        />
        <Drawer.Screen
          name='Packs'
          // options={{ headerShown: false }}
          component={PacksScreen}
        />
        {/* Binder */}
        {/* Settings */}
        {/* Logout */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  headerContainer: {
  },
  image: {
    // width: '100%',
    // height: 150,
    // marginTop: 50
    width: 100,
    height: 100,
    marginTop: 50,
    marginLeft: 14,
    borderRadius: 50
  },
  drawerItemContainer: {
    // backgroundColor: 'red'
  },
  userInfoContainer: {
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
  },
  userEmail: {
    color: 'gray'
  },
  userUsername: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 2
  },
  item: {
    // backgroundColor: 'red',
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 2,
    borderTopColor: 'lightgray'
  },
  firstChild: {
    marginTop: 14
  }
});