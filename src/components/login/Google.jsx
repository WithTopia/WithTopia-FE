import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const Google = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ token, setToken ] = useState();
  const URL = process.env.REACT_APP_SERVER_URL
  const GOOGLE_CODE = new URL (window.location.href).searchParams.get("code");
  const IP = `https://warmwinter.co.kr/member/login/google/callback?code=${GOOGLE_CODE}`;
  console.log(GOOGLE_CODE);
  // export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
  
  const postCode = async (GOOGLE_CODE) => {
    try {
      console.log(GOOGLE_CODE)
      const data = await axios.post(`${URL}/member/login/google`,{
        GOOGLE_CODE,
      });
    }
    catch (error) {
      console.log(error);
    }
  };
  
  const googleLogin = async (token) => {
    try {
        const response = await axios.get(IP);
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers[`refresh-token`];
        console.log(GOOGLE_CODE);
        console.log(response);
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
  };

  useEffect(() => {
    googleLogin();
  }, []);

  //4%2F0ARtbsJpDnAc6GxYR_USGTF0FTOyvgllRDmWANJ8t9GYmuaFVmeCMlCHtqojhTn7WJ90pxQ
  //&scope=email+profile+https%3A%2F%2Fwww.googleapis.com
  //%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com
  //%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=none
    return (
        <div>
          잠시만 기다려주세요 🤗
        </div>
    );
}

export default Google;
