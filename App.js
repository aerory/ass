import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WishlistScreen from './screens/WishlistScreen';
import HistoryScreen from './screens/HistoryScreen';
import InboxScreen from './screens/InboxScreen';
import CreateScreen from './screens/CreateScreen';

import {auth} from './components/firebase';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false, // Hide the header for all screens in this stack
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={currentUser ? 'HomeScreen' : 'LoginScreen'}
        drawerStyle={{width: '40%', backgroundColor: 'purple'}}
        drawerType="slide"
        overlayColor="transparent"
        screenOptions={{
          drawerActiveTintColor: 'darkslateblue',
          drawerActiveBackgroundColor: 'skyblue',
        }}>
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            drawerIcon: ({color}) => (
              <Ionicons name="log-in" size={16} color={color} />
            ),
            drawerLabelStyle: {
              fontSize: 16,
            },
          }}
        />
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="home" size={16} color={color} />
            ),
            drawerLabelStyle: {
              fontSize: 16,
            },
          }}
        />
        {currentUser && (
          <Drawer.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name="person" size={16} color={color} />
              ),
              drawerLabelStyle: {
                fontSize: 16,
              },
            }}
          />
        )}
        <Drawer.Screen
          name="Wishlist"
          component={WishlistScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="list" size={16} color={color} />
            ),
            drawerLabelStyle: {
              fontSize: 16,
            },
          }}
        />
        <Drawer.Screen
          name="History"
          component={HistoryScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="home" size={16} color={color} />
            ),
            drawerLabelStyle: {
              fontSize: 16,
            },
          }}
        />
        <Drawer.Screen
          name="Inbox"
          component={InboxScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="mail" size={16} color={color} />
            ),
            drawerLabelStyle: {
              fontSize: 16,
            },
          }}
        />
        <Drawer.Screen
          name="Create"
          component={CreateScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="create-outline" size={16} color={color} />
            ),
            drawerLabelStyle: {
              fontSize: 16,
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 48,
    color: 'black',
  },
  button: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    flexWrap: 'wrap',
    flex: 6,
    flexDirection: 'row',
  },
});
