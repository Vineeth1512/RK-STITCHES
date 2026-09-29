import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  count: 0
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload || [];
      state.count = state.items.length;
    },
    addToWishlist: (state, action) => {
      const exists = state.items.some(item => (item._id || item) === (action.payload._id || action.payload));
      if (!exists) {
        state.items.push(action.payload);
        state.count = state.items.length;
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => (item._id || item) !== action.payload);
      state.count = state.items.length;
    }
  }
});

export const { setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
