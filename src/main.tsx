import { StrictMode } from 'react';
import { ThemeProvider } from '@emotion/react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';
import App from '@/App.tsx';
import logo from '@/assets/images/logo.png';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="splash-screen">
        <img src={logo} alt="PIG!" />
        <p>사진으로부터 시작되는 제주도 여행</p>
      </div>
      <App />
    </ThemeProvider>
  </StrictMode>
);
