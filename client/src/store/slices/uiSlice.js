import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [],
  searchOpen: false,
  activeVideo: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast: (state, action) => {
      const id = Date.now().toString() + Math.random().toString().slice(2, 5);
      state.toasts.push({
        id,
        message: action.payload.message,
        type: action.payload.type || 'info', // success, error, warning, info
        duration: action.payload.duration || 4000
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    },
    openSearch: (state) => {
      state.searchOpen = true;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
    openVideoModal: (state, action) => {
      state.activeVideo = action.payload;
    },
    closeVideoModal: (state) => {
      state.activeVideo = null;
    }
  }
});

export const {
  addToast,
  removeToast,
  openSearch,
  closeSearch,
  openVideoModal,
  closeVideoModal
} = uiSlice.actions;

export default uiSlice.reducer;
