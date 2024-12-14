// components/ui/PasswordInput.tsx
import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import styled from '@emotion/styled';
import openeye from '@/assets/images/icons/oepneye.svg';
import closeeye from '@/assets/images/icons/closeeye.svg';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  isError?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = '비밀번호',
  style,
  isError = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PasswordWrapper>
      <StyledInput
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        style={{
          ...style,
          borderColor: isError ? 'red' : '#ccc',
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      />
      <EyeIcon onClick={togglePasswordVisibility}>
        {showPassword ? <img src={closeeye} /> : <img src={openeye} />}
      </EyeIcon>
    </PasswordWrapper>
  );
};

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding-right: 50px;
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
`;

export default PasswordInput;
