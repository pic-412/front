import { StrictMode } from 'react';
import { ThemeProvider } from '@emotion/react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';
import App from '@/App.tsx';
import SplashScreen from './pages/SplashScreen';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SplashScreen />
      <App />
    </ThemeProvider>
  </StrictMode>
);
