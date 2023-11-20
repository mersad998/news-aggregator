import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/system';
import { Provider } from 'react-redux';

import { customRoutes } from './core/routes';
import { store as reduxStore } from './core/redux/store';
import useColorMode from './core/hooks/useColorMode';
import ColorModeContext from './core/contexs/colorMode';
import i18n from './core/i18n';

export default function App(): ReactElement {
  const { colorMode, theme } = useColorMode();

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={reduxStore}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>{customRoutes}</BrowserRouter>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Provider>
    </I18nextProvider>
  );
}
