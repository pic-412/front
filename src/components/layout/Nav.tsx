const Navbar = () => {
  return (
    <div>
      <h1>Navbar</h1>
    </div>
  );
};
// const Navbar = () => {
//   const menus = [
//     { path: PATH.HOME, title: PATH_TITLE.HOME, Icon: HiOutlineHome },
//     { path: PATH.SCHEDULE, title: PATH_TITLE.SCHEDULE, Icon: HiOutlineCalendar },
//     { path: PATH.SALARY, title: PATH_TITLE.SALARY, Icon: HiOutlineCreditCard },
//     { path: PATH.PROFILE, title: PATH_TITLE.PROFILE, Icon: HiOutlineUserCircle },
//   ];

//   return (
//     <nav css={navStyle}>
//       <ul css={ulStyle}>
//         {menus.map(({ path, title, Icon }) => (
//           <li css={liStyle} key={title}>
//             <NavLink
//               to={path}
//               className={({ isActive }) => (isActive ? 'active' : undefined)}
//               css={linkStyle}
//             >
//               <Icon css={iconStyle} />
//               <span css={menuTitleStyle}>{title}</span>
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

export default Navbar;
