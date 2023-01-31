import {useEffect} from 'react';
import {useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {setWantToConnect} from '../redux/slices/deviceSlice';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BluetoothSerialModules from '../lib/BluetoothSerialModules';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/slices/userSlice';
const TopBar = ({setIsConnected}) => {
  const {deviceReducer} = useSelector(state => state);
  const {isConnected, wantToConnect} = deviceReducer;
  const [isCon, setIsCon] = useState(true);
  const dispatch = useDispatch();
  const {checkConnection} = BluetoothSerialModules();
  checkConnection(setIsCon);

  return (
    <View className="px-5 py-2 flex-row justify-between items-center border-b-0.5">
      <View>
        <MaterialCommunityIcons
          name="bluetooth"
          color={isConnected ? 'green' : 'gray'}
          size={35}
        />
      </View>
      {!isConnected ? (
        <TouchableOpacity
          onPress={() => {
            dispatch(setWantToConnect(true));
          }}
          className="bg-sky-500 px-3 py-2 rounded-xl">
          <Text className="text-white">Connect To Bluetooth</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default TopBar;
