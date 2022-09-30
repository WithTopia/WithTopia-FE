import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID


const Google = ({ onGoogleLogin }) => {
  
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_SERVER_URL
  const [searchParams, setSearchParams] = useSearchParams();
  const GOOGLE_CODE = searchParams.get("code");
  const IP = `https://warmwinter.co.kr/member/login/google?code=${GOOGLE_CODE}`;

  const googleLogin = async () => {
    try {
        const response = await axios.get(IP);
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.refreshtoken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshtoken", refreshToken);

        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("nickname", response.data.data.nickname);
        // localStorage.setItem("userImgUrl", response.payload);
        navigate("/main");
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
