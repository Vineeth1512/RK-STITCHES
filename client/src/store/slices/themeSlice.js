import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('rk_theme');
  if (storedTheme) {
    return storedTheme === 'dark';
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState = {
  darkMode: getInitialTheme()
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('rk_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('rk_theme', 'light');
      }
    },
    setTheme: (state, action) => {
      state.darkMode = action.payload === 'dark';
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('rk_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('rk_theme', 'light');
      }
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
