import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { addToast } from './uiSlice';

const getStoredWishlist = () => {
  try {
    const raw = localStorage.getItem('rk_wishlist');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const initialItems = getStoredWishlist();

const initialState = {
  items: initialItems,
  count: initialItems.length,
  loading: false,
  error: null
};

// Async thunk to fetch wishlist from server when logged in
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.isAuthenticated) return [];
      const res = await api.get('/wishlist');
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch wishlist');
    }
  }
);

// Async thunk to toggle wishlist item and sync with backend
export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async (design, { getState, dispatch, rejectWithValue }) => {
    try {
      const { auth, wishlist } = getState();
      const designId = design._id || design;
      const isWishlisted = wishlist.items.some(
        (item) => (item._id || item) === designId
      );

      if (isWishlisted) {
        dispatch(removeFromWishlist(designId));
        dispatch(addToast({ message: 'Removed from your Wishlist', type: 'info' }));
        if (auth.isAuthenticated) {
          await api.delete(`/wishlist/${designId}`);
        }
        return { action: 'removed', designId };
      } else {
        dispatch(addToWishlist(design));
        dispatch(addToast({ message: 'Saved to your Wishlist!', type: 'success' }));
        if (auth.isAuthenticated) {
          await api.post('/wishlist/add', { designId });
        }
        return { action: 'added', design };
      }
    } catch (err) {
      console.error('Wishlist toggle error:', err);
      return rejectWithValue(err.response?.data?.message || 'Failed to update wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload || [];
      state.count = state.items.length;
      localStorage.setItem('rk_wishlist', JSON.stringify(state.items));
    },
    addToWishlist: (state, action) => {
      const design = action.payload;
      const exists = state.items.some(
        (item) => (item._id || item) === (design._id || design)
      );
      if (!exists) {
        state.items.push(design);
        state.count = state.items.length;
        localStorage.setItem('rk_wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action) => {
      const designId = action.payload._id || action.payload;
      state.items = state.items.filter(
        (item) => (item._id || item) !== designId
      );
      state.count = state.items.length;
      localStorage.setItem('rk_wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      state.count = 0;
      localStorage.removeItem('rk_wishlist');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        state.count = state.items.length;
        localStorage.setItem('rk_wishlist', JSON.stringify(state.items));
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('auth/logout', (state) => {
        state.items = [];
        state.count = 0;
        localStorage.removeItem('rk_wishlist');
      });
  }
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
