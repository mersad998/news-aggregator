import { useMemo, useState } from 'react';
import { Theme, createTheme } from '@mui/material';

const useSettings = (): {
  colorMode: {
    toggleColorMode: () => void;
  };
  language: {
    toggleLanguage: () => void;
  };
  theme: Theme;
  selectedLanguage: 'en' | 'de';
} => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<'en' | 'de'>('en');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const languageSettings = useMemo(
    () => ({
      toggleLanguage: () => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'de' : 'en'));
      },
    }),
    [],
  );

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
