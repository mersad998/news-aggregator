import { createContext } from 'react';

const ColorModeContext = createContext({
  toggleColorMode: () => {
    console.warn('theme context error');
  },
});

export default ColorModeContext;
