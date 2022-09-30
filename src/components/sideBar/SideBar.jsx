import React, { useEffect, useState } from "react";
import "./SideBar.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineSmile,
  AiOutlineStar,
  AiOutlineTeam,
  AiOutlineSend,
  AiOutlineExport } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2"

const Sidebar = () => {
  const navigate = useNavigate()
  const [data,setData] = useState("")
  const [check,setCheck] = useState(false)
  let token = localStorage.getItem("accessToken")
  let refreshtoken = localStorage.getItem("refreshtoken")

  const logout = async() => {
    try{
      const out = await axios.post(`/member/logout`,{
      headers:{"authorization":token,"refreshtoken":refreshtoken}
    })
    // localStorage.removeItem("authorization");
    localStorage.clear();
    if(out.data.data === "로그아웃에 성공했습니다."){
      Swal.fire({title:"로그아웃에 성공했습니다.",confirmButtonColor:"#FFD68B"})
      navigate("/login")
    }if(out.data.errormessage === "로그인을 해주세요."){
      Swal.fire({title:"로그인을 해주세요.",confirmButtonColor:"#FFD68B"})
      navigate("/login")
    }
    }catch(error){
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
          <div className="user-name">환영합니다. {data.nickName.split('_',1)}님!</div></> : 
          <a href="/login"><button className="sideBar-login">LOG IN</button></a>}
      </div>
      <div className="menu-box">
        <div className="menu-txt">Menu</div>
        <hr/>
        <div className="side-menu">
          <a href='/main'><p><AiOutlineHome color="rgb(153, 95, 7)"/> Home</p></a>
          <a href='/profile'><p><AiOutlineSmile color="rgb(153, 95, 7)"/> Profile</p></a>
          <a href='/rank'><p><AiOutlineStar color="rgb(153, 95, 7)"/> Rank</p></a>
          <a href='/'><p><AiOutlineTeam color="rgb(153, 95, 7)"/> Friend</p></a>
          <a href='/'><p><AiOutlineSend color="rgb(153, 95, 7)"/> Description</p></a>
        </div>
      </div>
      <div className="logout-btn">
        <button className="logout" onClick={logout}>
          LOGOUT
        </button>
          
        </div>
    </div>
  );
}
export default Sidebar;