import React from 'react';
import {View, PermissionsAndroid, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Signin from './screens/auth/Signin';
import Signup from './screens/auth/Signup';
import Home from './screens/Home';
import Controllers from './screens/Controllers';
import Profile from './screens/Profile';
import ConnectBluetooth from './components/ConnectBluetooth';
import {Buffer} from 'buffer';
import {useSelector} from 'react-redux';
import BluetoothSerialModules from './lib/BluetoothSerialModules';
global.Buffer = Buffer;
const Tab = createBottomTabNavigator();
const requestAllPermissions = async () => {
  try {
    const Permission = PermissionsAndroid.PERMISSIONS;
    const granted = await PermissionsAndroid.request(
      Permission.ACCESS_FINE_LOCATION,
      {
        title: 'Bluetooth Access',
        message: 'IETP requests bluetooth permission',
        buttonPositive: 'Yes',
      },
    );
  } catch (err) {
    console.warn(err);
  }
};
requestAllPermissions();
function RootNavigator() {
  const {checkConnection} = BluetoothSerialModules();
  const {userReducer, deviceReducer} = useSelector(state => state);
  const {isLogged} = userReducer;
  const {wantToConnect} = deviceReducer;

  checkConnection();
  return !isLogged ? (
    userReducer.user != null ? (
      <View>
        <Signin />
      </View>
    ) : (
      <View>
        <Signup />
      </View>
    )
  ) : !wantToConnect ? (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#2B8DFE',
        }}>
        <Tab.Screen
          name="Home"
          children={props => <Home {...props} />}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            tabBarInactiveTintColor: '#8F98AA',
            tabBarActiveTintColor: '#2B8DFE',
          }}
        />

        <Tab.Screen
          name="Controllers"
          children={props => <Controllers {...props} />}
          options={{
            tabBarLabel: 'Controllers',
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
            tabBarInactiveTintColor: '#8F98AA',
            tabBarActiveTintColor: '#2B8DFE',
          }}
        />
        <Tab.Screen
          name="Profile"
          children={props => <Profile {...props} />}
          options={{
            tabBarLabel: 'Profile',
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),

            tabBarInactiveTintColor: '#8F98AA',
            tabBarActiveTintColor: '#2B8DFE',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <ConnectBluetooth />
  );
}
export default RootNavigator;
