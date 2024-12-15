import { StrictMode } from 'react';
import { ThemeProvider } from '@emotion/react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';
import App from '@/App.tsx';
import ScreenSequence from '@/components/layout/StartScreen';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ScreenSequence />
      <App />
    </ThemeProvider>
  </StrictMode>
);
