import React, { useState } from 'react';
import './SideBar.scss';
import { Link } from "react-router-dom";
import Sidebaritem from "./SidebarItem"
// import profile from "../../assets/lion";

const Sidebar = () => {
  const menus = [
    { name: "Home", path: "/main" },
    { name: "My Page", path: "/profile" },
    { name: "Rank", path: "/rank" },
    { name: "Friend", path:"/" },
    { name: "Direct Message", path:"/" }
  ];


  return (
    <div className='sidebar'>
      <div className='side-profile'>
        프로필
        {/* <Profile src={profile}></Profile> */}
      </div>
      <div className='menu-txt'>Menu</div>
      <hr/>
      <div className='side-menu'>
        {menus.map((menu, index) => {
        return (
          <Link to = {menu.path} key={index}>
            <Sidebaritem menu={menu}/>
          </Link>
        );
        })}
      </div>
      
      <div>
        <button className='logout'>
          Log-out
        </button>
      </div>
      
    </div>
  );
}

export default Sidebar;
