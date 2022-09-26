import React, { useState, useRef } from 'react';
import Header from "../header/Header"
import SideBar from "../sideBar/SideBar"
import "./UserProfile.scss"
import Footer from "../footer/Footer"
import logo from "../../assets/profileSample.png"
import AlertChangePw from '../blackScreen/AlertChangePw';

const Userprofile = () => {
  const imgRef = useRef(null);
  const [page,setPage] = useState(false)
  const handlePage1 = () => {
    setPage((prev)=>!prev)
  }
  return (
    <div className="user-profile">
      <Header></Header>
      <div className="profile-set">
        <SideBar/>
        <div className="user-profile-container">
          <h2>프로필 관리</h2>
          <div className='profile-container'>
            <div className='profile-manage'>
              <img src={logo} className='profile-image' alt=''></img>
              <div className='manage-container'>
                <div className='profile-nickname'>닉네임</div>
                <input className='nickname-input' placeholder='Please input new nickname' type="text"></input>
              </div>
            </div>
            <div className='profile-images-cont'>
              <img src={logo} alt='' ref={imgRef} onError={() => {return (imgRef.current.src = "")}}></img>
              <img src={logo} alt=''></img>
              <img src={logo} alt=''></img>
              <img src={logo} alt=''></img>
              <img src={logo} alt=''></img>
              <img src={logo} alt=''></img>
              <img src={logo} alt=''></img>
              <img src={logo} alt=''></img>
            </div>  
          </div>
          <div className='profile-btns'>
            <div className='btns-left'>
              <button onClick={handlePage1}>비밀번호 변경</button>
            </div>
            <div className='btns-right'>
              <button>변경하기</button>
              <button>취소</button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      {page ? <AlertChangePw page={page} setPage={setPage}></AlertChangePw> : null}
    </div>
  );
}

export default Userprofile;
