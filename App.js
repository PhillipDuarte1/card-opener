import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from './utils/firebase';
import MainScreen from './pages/MainScreen';
import PacksScreen from './pages/PacksScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import BinderScreen from './pages/BinderScreen';
import AddPackScreen from './pages/AddPackScreen';
import AdminPanelScreen from './pages/AdminPanelScreen';
import ProfileScreen from './pages/ProfileScreen';

export default function App() {
  const [user, setUser] = useState(null);

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const iconColor = '#fef4f4';

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
        <Stack.Screen name='Create Pack' component={AddPackScreen} />
        <Stack.Screen name='Admin Panel' component={AdminPanelScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
      </Stack.Navigator>
    )
  }

  const DrawerContent = (props) => {
    return (
      <View {...props} style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={user ? user.photoURL ? { uri: user.photoURL } : require('./assets/icon.png') : {}}
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
            icon={() => (<FontAwesome name='home' size={24} color={iconColor} />)}
            onPress={() => props.navigation.navigate('Home')}
            labelStyle={[styles.item, styles.firstChild]}
          />
          <DrawerItem
            label='Packs'
            icon={() => (<MaterialCommunityIcons name='cards' size={24} color={iconColor} />)}
            onPress={() => props.navigation.navigate('Packs')}
            labelStyle={styles.item}
          />
          <DrawerItem
            label='Binder'
            icon={() => (<MaterialCommunityIcons name='view-grid' size={24} color={iconColor} />)}
            onPress={() => props.navigation.navigate('Binder')}
            labelStyle={styles.item}
          />
          <DrawerItem
            label='Create Pack'
            icon={() => (<MaterialIcons name='add-to-photos' size={24} color={iconColor} />)}
            onPress={() => props.navigation.navigate('Create Pack')}
            labelStyle={styles.item}
          />
          <DrawerItem
            label='Admin Panel'
            icon={() => (<MaterialIcons name='admin-panel-settings' size={24} color={iconColor} />)}
            onPress={() => props.navigation.navigate('Admin Panel')}
            labelStyle={styles.item}
          />
          <DrawerItem
            label='Profile'
            icon={() => (<FontAwesome name='gear' size={24} color={iconColor} />)}
            onPress={() => props.navigation.navigate('Profile')}
            labelStyle={styles.item}
          />
        </ScrollView>
        <View style={styles.footer}>
          <DrawerItem
            label='Logout'
            icon={() => (<MaterialCommunityIcons name='logout' size={24} color={iconColor} />)}
            onPress={() => auth.signOut().then(() => { props.navigation.navigate('Home') })}
            labelStyle={[styles.item, styles.lastChild]}
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
          component={PacksScreen}
        />
        <Drawer.Screen
          name='Binder'
          component={BinderScreen}
        />
        <Drawer.Screen
          name='Create Pack'
          component={AddPackScreen}
        />
        <Drawer.Screen
          name='Admin Panel'
          component={AdminPanelScreen}
        />
        <Drawer.Screen
          name='Profile'
          component={ProfileScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#2e2828'
  },
  headerContainer: {
  },
  image: {
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
    color: '#fef4f4'
  },
  userUsername: {
    color: '#fef4f4',
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 2
  },
  item: {
    color: 'white'
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 2,
    borderTopColor: 'lightgray'
  },
  firstChild: {
    marginTop: 14
  },
  lastChild: {
    marginBottom: 14
  }
});