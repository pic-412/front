/* eslint-disable react/no-unknown-property */
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';
import mainIcon from '@/assets/images/icons/main.svg';
import mainIconActive from '@/assets/images/icons/main_active.svg';
import myPicIcon from '@/assets/images/icons/mypic.svg';
import myPicIconActive from '@/assets/images/icons/mypic_active.svg';
import profileIcon from '@/assets/images/icons/profile.svg';
import profileIconActive from '@/assets/images/icons/profile_active.svg';

const Navbar = () => {
  const menus = [
    { path: PATH.MAIN, title: '메인', icon: mainIcon, activeIcon: mainIconActive },
    { path: PATH.MYPIC, title: '마이픽', icon: myPicIcon, activeIcon: myPicIconActive },
    { path: PATH.PROFILE, title: '프로필', icon: profileIcon, activeIcon: profileIconActive },
  ];

  return (
    <div css={NavContainer}>
      {menus.map(({ path, title, icon, activeIcon }) => (
        <NavLink
          css={NavItem}
          to={path}
          key={title}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {({ isActive }) => (
            <div>
              <img src={isActive ? activeIcon : icon} alt={`${title}`} css={iconStyle} />
              {''}
              <span>{title}</span>
            </div>
          )}
        </NavLink>
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
  font-size: ${theme.fontSizes.normal};
  background-color: ${theme.colors.bg};
`;
const NavItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &.active {
    font-weight: bold;
    color: ${theme.colors.primary};
  }
`;

const iconStyle = css`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
`;
export default Navbar;
