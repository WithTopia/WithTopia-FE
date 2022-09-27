import React, { useEffect, useState } from "react";
import "./SideBar.scss";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineSmile,
  AiOutlineStar,
  AiOutlineTeam,
  AiOutlineSend,
  AiOutlineExport } from "react-icons/ai";
import samplePic from "../../assets/profileSample.png";
import axios from "axios";

const Sidebar = () => {
  const [data,setData] = useState("")
  const [check,setCheck] = useState(false)
  let token = localStorage.getItem("accessToken")
  let refreshtoken = localStorage.getItem("refreshtoken")

  const logout = () => {
  };
  const registerUser = async () => {
    try {
      const repo = await axios.get(`/member/mypage`,{headers:{"authorization":token,"refreshtoken":refreshtoken}});
      if(repo.data.errormessage === "사용자를 찾을 수 없습니다."){
        setCheck(false)
      }
      if(repo.data.statusMsg === "정상"){
        console.log(repo.data)
        setData(repo.data.data)
        setCheck(true)
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    registerUser()
  },[])

  return (
    <div className="sidebar">
      <div className="side-profile">
        {check ? <>
          <div className="user-profile">
            <img src={data !== "" ? data.profileImage : null} alt="profile" className="profile-img"/>
          </div>
          <div className="user-name">환영합니다. {data.nickName}님!</div></> : 
          <a href="/login"><button className="sideBar-login">LOG IN</button></a>}
      </div>
      <div className="menu-box">
        <div className="menu-txt">Menu</div>
        <hr/>
        <div className="side-menu">
          <a href='/main'><p><AiOutlineHome color="rgb(153, 95, 7)"/><Link to="/main" className='side-link'>Home</Link></p></a>
          <a href='/profile'><p><AiOutlineSmile color="rgb(153, 95, 7)"/><Link to="/profile" className='side-link'>Profile Management</Link></p></a>
          <a href='/rank'><p><AiOutlineStar color="rgb(153, 95, 7)"/><Link to="/rank" className='side-link'>Rank</Link></p></a>
          <a href='/'><p><AiOutlineTeam color="rgb(153, 95, 7)"/><Link to="/" className='side-link'>Friend</Link></p></a>
          <a href='/'><p><AiOutlineSend color="rgb(153, 95, 7)"/><Link to="/" className='side-link'>Direct Message</Link></p></a>
        </div>
      </div>
      <div className="logout-btn">
          <AiOutlineExport color= "rgba(227, 220, 220, 0.933)"/>
          <button className="logout" onClick={logout}>
            Log-out
          </button>
        </div>
    </div>
  );
}
export default Sidebar;