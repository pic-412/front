import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
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
    <NavContainer>
      {menus.map(({ path, title, icon, activeIcon }) => (
        <NavItem to={path} key={title} className={({ isActive }) => (isActive ? 'active' : '')}>
          {({ isActive }) => (
            <div>
              <IconStyle src={isActive ? activeIcon : icon} alt={`${title}`} />
              <span>{title}</span>
            </div>
          )}
        </NavItem>
      ))}
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 12px 0;
  border-top: 1px solid ${theme.colors.gray};
  border-radius: 12px;
  font-size: ${theme.fontSizes.normal};
  background-color: ${theme.colors.white};
`;

const NavItem = styled(NavLink)`
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

const IconStyle = styled.img`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
`;

export default Navbar;
