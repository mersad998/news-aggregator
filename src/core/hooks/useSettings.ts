import { useMemo, useState } from 'react';
import { Theme, createTheme } from '@mui/material';

interface UseSettings {
  colorMode: {
    toggleColorMode: () => void;
  };
  language: {
    toggleLanguage: () => void;
  };
  theme: Theme;
  selectedLanguage: 'en' | 'de';
}

// this hook will provide the accessability to setting context where ever needed
const useSettings = (): UseSettings => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark'); // default mode is dark
  const [language, setLanguage] = useState<'en' | 'de'>('en'); // default language is english

  // this function will toggle the color mode
  const colorMode = useMemo(
    () => ({
      toggleColorMode: (): void => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  // this function will toggle the language
  const languageSettings = useMemo(
    () => ({
      toggleLanguage: (): void => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'de' : 'en'));
      },
    }),
    [],
  );

  // this function will create a theme based on the selected mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'dark' ? '#242424' : '#f0f2f5',
            paper: mode === 'dark' ? '#242424' : '#ffffff',
          },
        },
      }),
    [mode],
  );

  return { colorMode, language: languageSettings, theme, selectedLanguage: language };
};

export default useSettings;
