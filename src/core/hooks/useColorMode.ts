import { useMemo, useState } from 'react';
import { Theme, createTheme } from '@mui/material';

const useColorMode = (): {
  colorMode: {
    toggleColorMode: () => void;
  };
  theme: Theme;
} => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

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
        },
      }),
    [mode],
  );

  return { colorMode, theme };
};

export default useColorMode;
