import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import TopBar from '../components/TopBar';
import BluetoothSerialModules from '../lib/BluetoothSerialModules';
const Controllers = ({setIsConnected}) => {
  const {writePackets, write} = BluetoothSerialModules();
  const {isConnected} = useSelector(state => state.deviceReducer);
  return (
    <View className="relative">
      <TopBar setIsConnected={setIsConnected} />
      <ScrollView>
        <View>
          <Text className="text-center text-xl text-black mt-3">
            Controllers
          </Text>
          <View className="items-center justify-center mt-12">
            <TouchableOpacity
              onPress={() => {
                if (isConnected) writePackets('1');
                else alert('You must first connect to a bluetooth device');
              }}
              className="bg-sky-500 px-5 py-5 w-2/3 mt-10 items-center rounded-xl">
              <Text className="text-lg text-white">Check Moisture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('pressed');
                if (isConnected) writePackets('0');
                else alert('You must first connect to a bluetooth device');
              }}
              className="bg-sky-500 px-5 py-5 w-2/3 mt-10 items-center rounded-xl">
              <Text className="text-lg text-white">Start Engine</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (isConnected) writePackets('2');
                else alert('You must first connect to a bluetooth device');
              }}
              className="bg-sky-500 px-5 py-5 w-2/3 mt-10 items-center rounded-xl">
              <Text className="text-lg text-white">Stop Engine</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Controllers;
