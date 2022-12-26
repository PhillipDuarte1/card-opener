import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './pages/MainScreen';
import PacksScreen from './pages/PacksSreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import HamburgerMenu from './components/HamburgerMenu';
import BinderScreen from './pages/BinderScreen';
import { View, Text, Image } from 'react-native';

export default function App() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

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
      <View {...props}>
        <View>
          <Image
            source={require('./assets/icon.png')}
            style={{ width: '100%', height: 150 }}
          />
          <Text>My Text</Text>
        </View>
        <DrawerItem
          label='Home'
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label='Packs'
          onPress={() => props.navigation.navigate('Packs')}
        />
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