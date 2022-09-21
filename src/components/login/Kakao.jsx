import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const Kakao = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];

  const IP = `https://warmwinter.co.kr/member/login/kakao/callback?code=${KAKAO_CODE}`;

  async function kakaoLogin() {
    try {
      const response = await axios.get(IP);
      const accessToken = response.headers.authorization;
      const refreshToken = response.headers[`refresh-token`];
      console.log(KAKAO_CODE);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshtoken", refreshToken);

      localStorage.setItem("email", response.payload);
      localStorage.setItem("nickname", response.payload);
      // localStorage.setItem("userImgUrl", response.payload);
      setTimeout(()=>{
        window.location.reload();
      },100);
      navigate("/main");
    }catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    kakaoLogin();
  }, []);


    return (
        <div>
          잠시만 기다려주세요 🤗
        </div>
    );
}

export default Kakao;
