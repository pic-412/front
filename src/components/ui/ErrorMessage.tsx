import styled from '@emotion/styled';

interface ErrorMessageProps {
  message: string;
  isVisible: boolean;
}

export const ErrorMessage = ({ message, isVisible }: ErrorMessageProps) => {
  if (!isVisible) return null;

  return <StyledErrorMessage>{message}</StyledErrorMessage>;
};

const StyledErrorMessage = styled.p`
  color: red;
  margin-top: 8px;
  font-size: 14px;
`;
