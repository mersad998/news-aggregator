import { createContext } from 'react';

const SettingsContext = createContext({
  colorMode: {
    toggleColorMode: () => {
      console.warn('color mode context error');
    },
  },
  language: {
    toggleLanguage: () => {
      console.warn('language context error');
    },
  },
});

export default SettingsContext;
