import {useState} from 'react';
import BluetoothSerial from 'react-native-bluetooth-serial';
import {useDispatch, useSelector} from 'react-redux';
import {
  setDevices,
  connectDevice,
  setIsConnected,
  disconnect,
  setIsProcessing,
  setWantToConnect,
  setIsBluetoothOn,
} from '../redux/slices/deviceSlice';
const iconv = require('iconv-lite');
export default () => {
  const dispatch = useDispatch();
  const {isConnected, connectedDevice} = useSelector(
    state => state.deviceReducer,
  );

  const [devices, setDevices] = useState([]);

  return {
    getAvailableDevices: async () => {
      const unpaired = await BluetoothSerial.discoverUnpairedDevices();
      const paired = await BluetoothSerial.list();
      setDevices([...unpaired, paired]);
    },
    connectToDevice: (device, setIsModalOpen) => {
      dispatch(setIsProcessing(true));
      BluetoothSerial.connect(device.id)
        .then(res => {
          dispatch(connectDevice(device));
          dispatch(setIsProcessing(false));
          setIsModalOpen(false);
          dispatch(setWantToConnect(false));
        })
        .catch(err => {
          setIsModalOpen(false);
          alert('Unable to connect ot device ' + device.name);
        });
    },
    checkConnection: async _ => {
      dispatch(setIsConnected(await BluetoothSerial.isConnected()));
      BluetoothSerial.on('bluetoothEnabled', () => {
        dispatch(setIsBluetoothOn(true));
      });
      BluetoothSerial.on('bluetoothDisabled', () => {
        alert('PLEASE ENABLE BLUETOOTH');
        dispatch(setIsConnected(false));
        dispatch(setWantToConnect(false));
        dispatch(setIsBluetoothOn(false));
      });
      BluetoothSerial.on('error', err => console.log(`Error: ${err.message}`));
      BluetoothSerial.on('connectionLost', () => {
        if (!connectDevice) {
          setIsConnected(false);
        }
        dispatch(disconnect());
      });
    },
    write: message => {
      if (!isConnected) {
        alert('You must first connect to a device.');
      } else {
        const toWrite = iconv.encode(message, 'cp852');
        BluetoothSerial.write(toWrite)
          .then(res => {
            console.log(res);
          })
          .catch(err => console.log(err.message));
      }
    },
    writePackets(message, packetSize = 64) {
      if (!isConnected) {
        alert('You must first connect to a device.');
      } else {
        const toWrite = iconv.encode(message, 'cp852');
        const writePromises = [];
        const packetCount = Math.ceil(toWrite.length / packetSize);

        for (var i = 0; i < packetCount; i++) {
          const packet = new Buffer(packetSize);
          packet.fill(' ');
          toWrite.copy(packet, 0, i * packetSize, (i + 1) * packetSize);
          writePromises.push(BluetoothSerial.write(packet));
        }

        Promise.all(writePromises).then(result => {
          console.log(result);
        });
      }
    },
    disconnectDevice() {
      BluetoothSerial.disconnect();
    },
    devices,
    connectedDevice,
    isConnected,
  };
};
