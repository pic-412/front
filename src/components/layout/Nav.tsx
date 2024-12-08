import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';
import { PATH } from '@/constants/path';

const Navbar = () => {
  const menus = [
    { path: PATH.HOME, title: '홈' },
    { path: PATH.MYPIC, title: '마이픽' },
    { path: PATH.PROFILE, title: '프로필' },
  ];

  return (
    <div css={NavContainer}>
      {menus.map(({ path, title }) => (
        <div
          css={NavItem}
          key={title}
          to={path}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {title}
        </div>
      ))}
    </div>
  );
};

const NavContainer = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 16px 0;
`;

const NavItem = css`
  text-decoration: none;

  &.active {
    font-weight: bold;
  }
`;

export default Navbar;
