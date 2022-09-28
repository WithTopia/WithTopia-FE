import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

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
      localStorage.setItem("email", response.data.data.nickname);
      localStorage.setItem("nickname", response.data.data.email);
      // localStorage.setItem("userImgUrl", response.payload);
      
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
