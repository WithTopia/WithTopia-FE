import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2"

const Kakao = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];

  const kakaoIP = `https://warmwinter.co.kr/member/login/kakao?code=${KAKAO_CODE}`;

  async function kakaoLogin() {
    try {
      const response = await axios.get(kakaoIP);
      const accessToken = response.headers.authorization;
      const refreshToken = response.headers.refreshtoken;
      const eMail = response.data.data.email;
      const nickName = response.data.data.nickname;
      
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshtoken", refreshToken);
      localStorage.setItem("email", eMail);
      localStorage.setItem("nickname", nickName);
      // localStorage.setItem("userImgUrl", response.payload);
      if(nickName.length > 10){
        Swal.fire({title:"닉네임을 2자~6자로 변경해주세요",confirmButtonColor:"#FFD68B"})
        navigate("/profile")
      }else{
        navigate("/main");
      }
    }catch (error) {
      if(error.response.data.errormessage === "이미 탈퇴한 멤버입니다."){
        Swal.fire({title:"이미 탈퇴한 멤버입니다.",confirmButtonColor:"#FFD68B"})
        navigate("/")
      }
      if(error.response.data.errormessage === "동일한 이메일이 이미 존재합니다."){
        Swal.fire({title:"동일한 이메일이 이미 존재합니다.",confirmButtonColor:"#FFD68B"})
        navigate('/login')
      }
    }
  }
  useEffect(() => {
    kakaoLogin();
  }, []);

    return (
        <div>
        </div>
    );
}

export default Kakao;
