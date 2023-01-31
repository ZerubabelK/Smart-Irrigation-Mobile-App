import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  devices: [],
  isConnected: false,
  connectedDevice: {},
  wantToConnect: false,
};
const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    addDevice: (state, {payload}) => {
      state.devices.push(payload);
    },
    setDevices: (state, {payload}) => {
      state.devices = payload;
    },
    connectDevice: (state, {payload}) => {
      state.connectedDevice = payload;
      state.isConnected = true;
    },
    disconnect: state => {
      state.connectedDevice = {};
      state.isConnected = false;
    },
    setIsConnected: (state, {payload}) => {
      state.isConnected = payload;
    },
    setWantToConnect: (state, {payload}) => {
      state.wantToConnect = payload;
    },
  },
});
export const {
  addDevice,
  connectDevice,
  disconnect,
  setDevices,
  setIsConnected,
  setWantToConnect,
} = deviceSlice.actions;
export default deviceSlice.reducer;
