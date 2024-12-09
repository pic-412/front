import styled from '@emotion/styled';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

const Separator = styled.div<SeparatorProps>`
  background-color: #fff;
  ${({ orientation = 'horizontal' }) =>
    orientation === 'horizontal'
      ? `
        width: 100%;
        height: 1px;
      `
      : `
        width: 1px;
        height: 100%;
      `}

  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `margin: 8px 0;`;
      case 'md':
        return `margin: 16px 0;`;
      case 'lg':
        return `margin: 24px 0;`;
    }
  }}
`;

export default Separator;
