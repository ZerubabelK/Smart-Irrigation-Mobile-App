import {
  Button,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import BluetoothSerialModules from '../lib/BluetoothSerialModules';
import {setWantToConnect} from '../redux/slices/deviceSlice';
import {useDispatch, useSelector} from 'react-redux';
const ConnectBluetooth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {isProcessing, isConnected} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  let id = 0;
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const {getAvailableDevices, devices, connectToDevice} =
    BluetoothSerialModules();

  getAvailableDevices();

  return (
    <View
      aria-disabled={isModalOpen}
      style={isModalOpen ? {backgroundColor: '#2d2d2dad'} : {}}
      className={`h-screen w-screen justify-center bg-slate-100`}>
      <View className="absolute top-0 w-screen items-end">
        <TouchableOpacity
          className="mx-5 my-3 px-5 py-2 bg-sky-600 rounded-xl "
          onPress={() => {
            dispatch(setWantToConnect(false));
          }}>
          <Text className="text-white">Cancel</Text>
        </TouchableOpacity>
      </View>
      <View className="items-center justify-center">
        <Text className="text-center text-xl">
          Please Connect To A Bluetooth Device
        </Text>
        <View>
          {isOpen ? (
            <ScrollView className="w-[80vw] max-h-[80vh] px-3">
              {devices.length > 0 ? (
                devices.map(device => {
                  if (device.name)
                    return (
                      <View
                        style={
                          isModalOpen
                            ? {
                                backgroundColor: 'transparent',
                              }
                            : {}
                        }
                        key={id++}
                        className="text-center justify-between my-5 items-center py-5 bg-white drop-shadow-xl rounded-lg border-[1px] border-gray-400">
                        <View className="grid grid-cols-2 flex-row justify-evenly mb-4 w-full">
                          <View>
                            <Text className="mb-3">Name</Text>
                            <Text>MAC Address:</Text>
                          </View>
                          <View>
                            <Text className="text-gray-600 mb-3">
                              {device.name}
                            </Text>
                            <Text className="text-gray-600">{device.id}</Text>
                          </View>
                        </View>

                        <TouchableOpacity
                          style={
                            isModalOpen
                              ? {
                                  backgroundColor: 'transparent',
                                }
                              : {}
                          }
                          disabled={isModalOpen}
                          onPress={() => {
                            console.log(device);
                            setIsModalOpen(true);
                            connectToDevice(device, setIsModalOpen);
                          }}
                          className="bg-sky-500  px-3 py-3  rounded-lg w-1/2">
                          <Text
                            style={
                              isModalOpen
                                ? {
                                    color: 'transparent',
                                  }
                                : {}
                            }
                            className="text-white text-center">
                            Connect
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                })
              ) : (
                <View className="justify-center h-full items-center text-2xl">
                  <Text>Scanning...</Text>
                </View>
              )}
            </ScrollView>
          ) : (
            <TouchableOpacity
              onPress={toggle}
              className="w-1/2 bg-sky-500 px-2 py-3 rounded-2xl mt-3">
              <Text className="text-center text-white text-xl">
                Scan For Device
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {isModalOpen ? (
          !isConnected ? (
            <View className="absolute top-0 left-0 h-screen w-screen bg-transparent items-center">
              <View className="bg-sky-400 px-5 py-3 rounded-md">
                <Text className="text-white text-xl">Processing...</Text>
              </View>
            </View>
          ) : (
            <View className="absolute top-0 left-0 h-screen w-screen bg-transparent items-center">
              <View className="bg-sky-400 px-5 py-3 rounded-md">
                <Text className="text-white text-xl">Connected...</Text>
              </View>
            </View>
          )
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default ConnectBluetooth;
