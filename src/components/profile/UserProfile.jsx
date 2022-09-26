import React, { useState, useRef } from 'react';
import Header from "../header/Header"
import SideBar from "../sideBar/SideBar"
import "./UserProfile.scss"
import Footer from "../footer/Footer"
import logo from "../../assets/profileSample.png"
import AlertChangePw from '../blackScreen/AlertChangePw';
import axios from 'axios';

const Userprofile = () => {
  const imgRef = useRef(null);
  const [page,setPage] = useState(false)
  const handlePage1 = () => {
    setPage((prev)=>!prev)
  }

  const [nickName, setNickName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const getProfile = async () => {
    try {
      const data = await axios.get(`/mypage/image`);
    }catch(error){
      console.log(error)
    }
  }

  const postProfile = async () => {
    try {
      const response = await axios.put(`/member/mypage`,{
        nickName : nickName,
        profileImage : profileImage,
      })
    }catch(error){
      console.log(error)
    }
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
              <img image_id="1" src={`https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/original.jpeg`} alt='' ref={imgRef} onError={() => {return (imgRef.current.src = "https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/profileSample.png")}}></img>
              <img image_id="2" src={`https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/winter.png`} alt='' ref={imgRef} onError={() => {return (imgRef.current.src = "https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/profileSample.png")}}></img>
              <img image_id="3" src={`https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/cat.png`} alt='' ref={imgRef} onError={() => {return (imgRef.current.src = "https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/profileSample.png")}}></img>
              <img image_id="4" src={`https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/tartar.png`} alt='' ref={imgRef} onError={() => {return (imgRef.current.src = "https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/profileSample.png")}}></img>
              <img image_id="5" src={`https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/dram.png`} alt='' ref={imgRef} onError={() => {return (imgRef.current.src = "https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/profileSample.png")}}></img>
              <img image_id="6" src={`https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/%ED%9D%A0.jpg`} alt='' ref={imgRef} onError={() => {return (imgRef.current.src = "https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/profileSample.png")}}></img>
              <img image_id="7" src={`https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/sumi.png`} alt='' ref={imgRef} onError={() => {return (imgRef.current.src = "https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/profileSample.png")}}></img>
              <img image_id="8" src={`https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/profileSample.png`} alt='' ref={imgRef} onError={() => {return (imgRef.current.src = "https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/profileSample.png")}}></img>
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
