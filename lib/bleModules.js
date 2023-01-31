import {useState} from 'react';
import {BleManager} from 'react-native-ble-plx';
const bleManager = new BleManager();

export default bleModules = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState({id: ''});
  const [isConnected, setIsConnected] = useState(false);
  console.log(devices);
  const isDuplicate = (preList, newEl) =>
    preList.findIndex(el => el.id === newEl.id) > -1;
  return {
    scanForDevice: () => {
      bleManager.startDeviceScan(
        null,
        {allowDuplicates: false},
        (error, device) => {
          if (error) {
            console.log(error);
            return;
          }
          setDevices(prevState => {
            if (!isDuplicate(devices, device)) {
              return [...prevState, {...device}];
            }
            return prevState;
          });
        },
      );
    },
    devices,
    connectedDevice,
    connectToDevice: async id => {
      const deviceConnection = await bleManager.connectToDevice(id);
      setConnectedDevice(deviceConnection);
    },
    disconnectDevice: () => {
      bleManager.cancelDeviceConnection(connectedDevice.id);
    },
    isBluetoothOn: () => {
      bleManager.onStateChange(state => {
        if (state === 'PoweredOn') {
          setIsConnected(true);
        } else setIsConnected(false);
      }, true);
    },
  };
};
