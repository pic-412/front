import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  type?: 'success' | 'error';
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  onClose,
  duration = 1000,
  type = 'success',
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <ToastContainer type={type}>
      <ToastMessage>{message}</ToastMessage>
    </ToastContainer>
  );
};

const ToastContainer = styled.div<{ type: 'success' | 'error' }>`
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);

  background-color: ${(props) =>
    props.type === 'success' ? theme.colors.primary : theme.colors.red};

  color: ${theme.colors.white};
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1100;

  text-align: center;
  font-size: 16px;
`;

const ToastMessage = styled.p`
  margin: 0;
  white-space: nowrap;
`;

export const useToast = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setIsToastVisible(true);
  };

  const hideToast = () => {
    setIsToastVisible(false);
  };

  const ToastComponent = () => (
    <Toast message={toastMessage} isVisible={isToastVisible} onClose={hideToast} type={toastType} />
  );

  return {
    Toast: ToastComponent,
    showToast,
    hideToast,
  };
};
export default Toast;
