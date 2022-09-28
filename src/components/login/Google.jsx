import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import GoogleLogin from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID


const Google = ({ onGoogleLogin }) => {
  
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_SERVER_URL
  const [searchParams, setSearchParams] = useSearchParams();
  const GOOGLE_CODE = searchParams.get("code");
  const IP = `https://warmwinter.co.kr/member/login/google?code=${GOOGLE_CODE}`;
  console.log(GOOGLE_CODE);

  const googleLogin = async () => {
    try {
        const response = await axios.get(IP);
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.refreshtoken;
        console.log(GOOGLE_CODE);
        console.log(response);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshtoken", refreshToken);

        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("nickname", response.data.data.nickname);
        // localStorage.setItem("userImgUrl", response.payload);
        navigate("/main");
    }catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    googleLogin();
  }, []);

    return (
        <div>
          잠시만 기다려주세요 🤗
        </div>
    );
}

export default Google;
