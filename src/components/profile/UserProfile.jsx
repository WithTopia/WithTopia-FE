import React, { useState, useRef, useEffect } from 'react';
import Header from "../header/Header"
import SideBar from "../sideBar/SideBar"
import "./UserProfile.scss"
import Footer from "../footer/Footer"
import logo from "../../assets/profileSample.png"
import AlertChangePw from '../blackScreen/AlertChangePw';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"

const Userprofile = () => {
  const navigate = useNavigate()
  let token = localStorage.getItem("accessToken")
  let refreshtoken = localStorage.getItem("refreshtoken")
  
  const [images,setImages] = useState("")
  const [targetImage,setTargetImage] = useState("")
  const [userData,setUserData] = useState("")
  const [checkPoint,setCheckPoint] = useState(false)
  const [nickName, setNickName] = useState('');
  const [page,setPage] = useState(false)
  const imgRef = useRef(null);

  
  const handlePage1 = () => {
    setPage((prev)=>!prev)
  }
  const handleBlock = (url) => {
    setTargetImage(url)
  }

  const [nickName, setNickName] = useState('');
  const getMyProfile = async () => {
    try {
      const data = await axios.get(`/member/mypage`,{headers:{"authorization":token,"refreshtoken":refreshtoken}});
      if(data.data.errormessage === "Token이 유효하지 않습니다."){
        Swal.fire({title:"로그인을 해주세요.",confirmButtonColor:"#FFD68B"})
        navigate("/login")
        return
      }
      if(data.data.errormessage === "사용자를 찾을 수 없습니다."){
        Swal.fire({title:"로그인을 해주세요.",confirmButtonColor:"#FFD68B"})
        navigate("/login")
        return
      }
      if(data.data.statusMsg === "정상"){
        setUserData(data.data.data)
      }
    }catch(error){
    }
  }
  const handleNickName = (e) => {
    setNickName(e.target.value)
  }

  const getImages = async () => {
    try{
      const data = await axios.get(`/mypage/image`);
      setImages(data.data.data)
    }catch(error){
    }
  }

  const postProfile = async () => {
    try{
      if(nickName.length < 2 || nickName.length > 6){
        Swal.fire({title:"2자 이상 6자 이하로 입력해주세요.",confirmButtonColor:"#FFD68B"})
        return
      }
      if(nickName.includes(" ")){
        Swal.fire({title:"닉네임 형식에 맞지 않습니다.",confirmButtonColor:"#FFD68B"})
        return
      }
      const repo = await axios.put(`/member/mypage`,{
        nickName : nickName,
        profileImage : targetImage,
      },{headers:{"authorization":token,"refreshtoken":refreshtoken}})
      const accessToken = repo.headers.authorization;
      const refreshToken = repo.headers.refreshtoken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshtoken", refreshToken);
      if(repo.data.errormessage === "닉네임 양식에 맞지 않습니다."){
        Swal.fire({title:"닉네임은 2자 이상 6자 미만입니다",confirmButtonColor:"#FFD68B"})
      }
      if(repo.data.statusMsg === "정상"){
        Swal.fire({title:"변경되었습니다.",confirmButtonColor:"#FFD68B"})
        navigate("/main")
      }
    }catch(error){
    }
  }
  
  const onExit = async () => {
    try{
      const res = await axios.put(`/member/leave`,{},{
        headers : {"authorization":token,"refreshtoken":refreshtoken}
      })
      if(res.data.data ==="success"){
        Swal.fire({title:"탈퇴요청이 정상 접수 되었습니다. 보안을 위해 회원정보는 3일 후 완전삭제 됩니다. 이용해주셔서 감사합니다 :)",confirmButtonColor:"#FFD68B"})
        localStorage.clear();
        navigate("/")
      }
      if(res.data.errormessage === "탈퇴한지 3일이 경과하지 않았습니다."){
        Swal.fire({title:"탈퇴한지 3일이 경과하지 않았습니다.",confirmButtonColor:"#FFD68B"})
        localStorage.clear();
        navigate("/")
      }
    }catch(error){
    }
  }

  useEffect(()=>{
    setNickName(userData.nickName)
  },[userData.nickName])


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
          <h2>Profile</h2>
          <div className='profile-container'>
            <div className='profile-manage'>
              <img src={targetImage === "" ? userData.profileImage : targetImage}  className='profile-image' alt=''></img>
              <div className='manage-container'>
                <div className='profile-nickname'>닉네임</div>
                <input className='nickname-input' type="text" defaultValue={userData.nickName === undefined ? "" : userData.nickName} onChange={handleNickName} maxLength={5}></input>
                <button className="withdrawal" onClick={onExit}>회원탈퇴</button>
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
      {/* <Footer></Footer> */}
      {page ? <AlertChangePw page={page} setPage={setPage}></AlertChangePw> : null}
    </div>
  );
}

export default Userprofile;
