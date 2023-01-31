import {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

const Devices = ({allDevices, connectDevice}) => {
  let id = 0;
  return (
    <ScrollView className="w-screen max-h-[80vh]">
      {allDevices.map(device => {
        console.log(allDevices.length);
        if (device.name)
          return (
            <View
              key={id++}
              className="text-center flex-row justify-center py-3 items-center shadow-xl">
              <Text className="text-gray-600">{device.name}</Text>
              <Pressable
                onPress={() => {
                  console.log('pressed');
                  connectDevice(device.id);
                }}
                className="bg-sky-500 ml-5 px-3 py-2  rounded-lg">
                <Text className="text-white text-center">Connect</Text>
              </Pressable>
            </View>
          );
      })}
    </ScrollView>
  );
};
export default Devices;
