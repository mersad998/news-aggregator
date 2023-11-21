import { useMemo, useState } from 'react';
import { Theme, createTheme } from '@mui/material';

const useColorMode = (): {
  colorMode: {
    toggleColorMode: () => void;
  };
  theme: Theme;
} => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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

  return { colorMode, theme };
};

export default useColorMode;
