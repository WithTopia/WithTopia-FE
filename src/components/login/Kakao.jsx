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
      console.log(KAKAO_CODE);
      console.log(response);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshtoken", refreshToken);
      localStorage.setItem("email", response.data.data.email);
      localStorage.setItem("nickname", response.data.data.nickname);
      // localStorage.setItem("userImgUrl", response.payload);
      
      navigate("/main");
    }catch (error) {
      console.log(error);
      if(error.response.data.errormessage === "이미 탈퇴한 멤버입니다."){
        Swal.fire(error.response.data.errormessage)
        navigate("/")
      }
      if(error.response.data.errormessage === "동일한 이메일이 이미 존재합니다."){
        Swal.fire(error.response.data.errormessage)
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
