import React, { useState } from 'react';
import './SideBar.scss';
import { Link } from "react-router-dom";
import { 
  AiOutlineHome, 
  AiOutlineSmile, 
  AiOutlineStar, 
  AiOutlineTeam, 
  AiOutlineSend,
  AiOutlineExport } from "react-icons/ai";
// import Sidebaritem from "./SidebarItem"
// import HomeIcon from "../../assets/HomeIcon";
import samplePic from "../../assets/profileSample.png";

const Sidebar = () => {
  const logout = () => {
    console.log("bye");
  };
  
  return (
    <div className='sidebar'>
      <div className='side-profile'>
        <div  className='user-profile'>
          <img src={samplePic} alt="profile" className='profile-img'/>
        </div>
        <div className='user-name'>야생의  UserNick 님!</div>
        {/* <Profile src={profile}></Profile> */}
      </div>
      <div className='menu-txt'>Menu</div>
      <hr/>
      <div className='side-menu'>
        <p><AiOutlineHome color='rgb(153, 95, 7)'/><Link to="/main">Home</Link></p>
        <p><AiOutlineSmile color='rgb(153, 95, 7)'/><Link to="/profile">My Page</Link></p>
        <p><AiOutlineStar color='rgb(153, 95, 7)'/><Link to="/rank">Rank</Link></p>
        <p><AiOutlineTeam color='rgb(153, 95, 7)'/><Link to="/">Friend</Link></p>
        <p><AiOutlineSend color='rgb(153, 95, 7)'/><Link to="/">Direct Message</Link></p>
      </div>
      <div className='logout-btn'>
        <AiOutlineExport color= 'rgba(227, 220, 220, 0.933)'/>
        <button className='logout' onClick={logout}>
          Log-out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
