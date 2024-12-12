/* eslint-disable react/prop-types */
// Checkbox.tsx
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import checkboxIcon from '@/assets/images/icons/checkbox.svg?raw'; // Vite에서 SVG import 시 ?raw 추가
import checkedIcon from '@/assets/images/icons/checkbox_clicked.svg?raw';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  font-size: 16px;
  border: 3px solid ${theme.colors.gray};
  border-radius: 6px;
  padding: 14px 12px;
  color: ${theme.colors.darkGray};
`;

const CheckboxInput = styled.div<{ checked?: boolean }>`
  width: 20px;
  height: 20px;
  background-image: url('data:image/svg+xml,${({ checked }) =>
    encodeURIComponent(checked ? checkedIcon : checkboxIcon)}');
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 8px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  font-size: 16px;
`;

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  return (
    <CheckboxWrapper>
      <CheckboxInput checked={checked} onClick={() => onChange?.(!checked)} />
      <CheckboxLabel onClick={() => onChange?.(!checked)}>{label}</CheckboxLabel>
    </CheckboxWrapper>
  );
};

export default Checkbox;
