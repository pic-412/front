// Button.tsx
import styled from '@emotion/styled';

const sharedStyles = `
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

interface ButtonProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

const Button = styled.button<ButtonProps>`
  ${sharedStyles}
  background-color: ${({ variant }) => (variant === 'white' ? '#fff' : '#fdf6ac')};
  color: #333;
  width: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '100px';
      case 'md':
        return '150px';
      case 'lg':
        return '100%';
      default:
        return '150px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '40px';
      case 'md':
        return '44px';
      case 'lg':
        return '48px';
      default:
        return '40px';
    }
  }};

  &:hover {
    background-color: #f0e6a0;
  }
`;

export default Button;
