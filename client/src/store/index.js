import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import themeReducer from './slices/themeSlice.js';
import wishlistReducer from './slices/wishlistSlice.js';
import uiReducer from './slices/uiSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    wishlist: wishlistReducer,
    ui: uiReducer
  }
});
