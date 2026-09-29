import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
  try {
    const raw = localStorage.getItem('rk_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

const token = localStorage.getItem('rk_token');
const user = getInitialUser();

const initialState = {
  user,
  token,
  isAuthenticated: Boolean(token && user),
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem('rk_token', action.payload.token);
      localStorage.setItem('rk_user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('rk_user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('rk_token');
      localStorage.removeItem('rk_user');
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
