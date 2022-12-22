import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './pages/MainScreen';
import PacksScreen from './pages/PacksSreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import HamburgerMenu from './components/HamburgerMenu';

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
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Main'>
        <Drawer.Screen name='Home' options={{ headerShown: false }} component={MyStack} />
        <Drawer.Screen name='Packs' component={PacksScreen} />
        {/* Binder */}
        {/* Settings */}
        {/* Logout */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}