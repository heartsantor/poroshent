import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
  user: undefined,
  credentials: undefined
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.credentials = action.payload.credentials;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      // localStorage.clear();
      localStorage.removeItem('auth');
    }
  }
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
