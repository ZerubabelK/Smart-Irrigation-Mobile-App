import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLogged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, {payload}) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
    },
    signup(state, {payload}) {
      state.user = payload;
      state.isLogged = true;
    },
  },
});

export const {login, logout, signup} = userSlice.actions;
export default userSlice.reducer;
