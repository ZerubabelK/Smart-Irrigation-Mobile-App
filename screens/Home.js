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
import TopBar from '../components/TopBar';
const Home = ({setIsConnected}) => {
  return (
    <View className="h-full py-2">
      <TopBar setIsConnected={setIsConnected} />
      <ScrollView className="-z-0">
        <View>
          <Text className="text-center text-3xl text-black mt-3">Servces</Text>
          <View className="items-center">
            <View className="h-52 p-5 mt-5 w-3/4 items-center bg-cyan-300 rounded-xl">
              <MaterialCommunityIcons
                name="cogs"
                size={100}
                color={'#155e75'}
              />
              <Text className="mt-3 text-xl">Integration with an</Text>
              <Text className="text-xl">Arduino System</Text>
            </View>
            <View className="h-52 p-5 mt-5 w-3/4 items-center bg-cyan-300 rounded-xl">
              <MaterialCommunityIcons
                name="signal"
                size={100}
                color={'#155e75'}
              />
              <Text className="mt-3 text-xl">Signal Transmission</Text>
              <Text className="text-xl"> with controller</Text>
            </View>
            <View className="h-52 p-5 mt-5 w-3/4 items-center bg-cyan-300 rounded-xl">
              <MaterialCommunityIcons
                name="bell"
                size={100}
                color={'#155e75'}
              />
              <Text className="mt-3 text-xl">Live notification from </Text>
              <Text className="text-xl">control system</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
