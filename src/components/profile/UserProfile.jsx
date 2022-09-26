import React, { useState, useRef, useEffect } from 'react';
import Header from "../header/Header"
import SideBar from "../sideBar/SideBar"
import "./UserProfile.scss"
import Footer from "../footer/Footer"
import logo from "../../assets/profileSample.png"
import AlertChangePw from '../blackScreen/AlertChangePw';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Userprofile = () => {
  const navigate = useNavigate()
  let token = localStorage.getItem("accessToken")
  let refreshtoken = localStorage.getItem("refreshtoken")
  
  const [images,setImages] = useState("")
  const [targetImage,setTargetImage] = useState("")
  const [userData,setUserData] = useState("")
  const [checkPoint,setCheckPoint] = useState(false)

  const imgRef = useRef(null);
  const [page,setPage] = useState(false)
  const handlePage1 = () => {
    setPage((prev)=>!prev)
  }
  const handleBlock = (url) => {
    setTargetImage(url)
    console.log(url)
  }
  const [nickName, setNickName] = useState('');

  const getMyProfile = async () => {
    try {
      const data = await axios.get(`/member/mypage`,{headers:{"authorization":token,"refreshtoken":refreshtoken}});
      if(data.data.errormessage === "Token이 유효하지 않습니다."){
        alert("로그인을 해주세요.")
        navigate("/login")
        return
      }
      if(data.data.errormessage === "사용자를 찾을 수 없습니다."){
        alert("로그인을 해주세요.")
        navigate("/login")
        return
      }
      if(data.data.statusMsg === "정상"){
        setUserData(data.data.data)
      }
    }catch(error){
      console.log(error)
    }
  }
  const handleNickName = (e) => {
    setNickName(e.target.value)
  }

  const getImages = async () => {
    try{
      const data = await axios.get(`/mypage/image`);
      console.log(data.data.data)
      setImages(data.data.data)
    }catch(error){
      console.log(error)
    }
  }

  const postProfile = async () => {
    try{
      if(nickName.length < 2){
        alert("최소 두글자 이상 입력해주세요.")
        return
      }
      if(nickName.includes(" ")){
        alert("닉네임 형식에 맞지 않습니다.")
        return
      }
      const repo = await axios.put(`/member/mypage`,{
        nickName : nickName,
        profileImage : targetImage,
      },{headers:{"authorization":token,"refreshtoken":refreshtoken}})
      console.log(repo)
      if(repo.data.statusMsg === "정상"){
        alert("변경되었습니다.")
        navigate("/main")
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getMyProfile()
    getImages()
  },[])

  return (
    <div className="user-profile">
      <Header></Header>
      <div className="profile-set">
        <SideBar/>
        <div className="user-profile-container">
          <h2>Profile Management</h2>
          <div className='profile-container'>
            <div className='profile-manage'>
              <img src={targetImage === "" ? userData.profileImage : targetImage} className='profile-image' alt=''></img>
              <div className='manage-container'>
                <div className='profile-nickname'>닉네임</div>
                <input className='nickname-input' placeholder={userData.nickName} type="text" value={nickName} onChange={handleNickName}></input>
              </div>
            </div>
            <div className='profile-images-cont'>
              {images !== "" ? images.map((image,index)=>{
                return(
                  <img key={index} src={image.imageUrl} alt='' onClick={()=>handleBlock(image.imageUrl)} ref={imgRef} onError={() => {return (imgRef.current.src = "https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/profileSample.png")}}></img>
                )
              }) : null}
            </div>  
          </div>
          <div className='profile-btns'>
            <div className='btns-left'>
              <button onClick={handlePage1}>비밀번호 변경</button>
            </div>
            <div className='btns-right'>
              <button onClick={postProfile}>변경하기</button>
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
