import React, { useEffect, useState } from "react";
import "./SideBar.scss";
import { Link, Navigate } from "react-router-dom";
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

  const logout = async() => {
    try{
      const out = await axios.post(`/member/logout`,{
      headers:{"authorization":token,"refreshtoken":refreshtoken}
    })
    console.log(out)
    // localStorage.removeItem("authorization");
    localStorage.clear();
    if(out.data.data === "로그아웃에 성공했습니다."){
      alert(out.data.data)
      window.location.href = "/login"
    }if(out.data.errormessage === "로그인을 해주세요."){
      alert(out.data.errormessage)
      window.location.href = "/login"
    }
    }catch(error){
    console.log(error);
    }
  };
  const registerUser = async () => {
    try {
      const repo = await axios.get(`/member/mypage`,{headers:{"authorization":token,"refreshtoken":refreshtoken}});
      if(repo.data.errormessage === "사용자를 찾을 수 없습니다."){
        setCheck(false)
      }
      if(repo.data.statusMsg === "정상"){
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
<<<<<<< HEAD
          <a href='/main' className='side-link'><p><AiOutlineHome color="rgb(153, 95, 7)"/> Home</p></a>
          <a href='/profile' className='side-link'><p><AiOutlineSmile color="rgb(153, 95, 7)"/> Profile Management</p></a>
          <a href='/rank' className='side-link'><p><AiOutlineStar color="rgb(153, 95, 7)"/> Rank</p></a>
          <a href='/' className='side-link'><p><AiOutlineTeam color="rgb(153, 95, 7)"/>Friend</p></a>
          <a href='/' className='side-link'><p><AiOutlineSend color="rgb(153, 95, 7)"/>Direct Message</p></a>
=======
          <a href='/main'><p><AiOutlineHome color="rgb(153, 95, 7)"/> Home</p></a>
          <a href='/profile'><p><AiOutlineSmile color="rgb(153, 95, 7)"/> Profile</p></a>
          <a href='/rank'><p><AiOutlineStar color="rgb(153, 95, 7)"/> Rank</p></a>
          <a href='/'><p><AiOutlineTeam color="rgb(153, 95, 7)"/> Friend</p></a>
          <a href='/'><p><AiOutlineSend color="rgb(153, 95, 7)"/> Description</p></a>
>>>>>>> 8f5a0b99540901b9b2fa24e4b184483692e2fcb7
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