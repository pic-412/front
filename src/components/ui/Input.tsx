import theme from '@/styles/theme';
import styled from '@emotion/styled';

const sharedStyles = `
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  background-color: #f7f5ef;
  color: #333;
  width: 80vw;
  max-width: 400px;
`;

const Input = styled.input`
  ${sharedStyles}

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export default Input;
