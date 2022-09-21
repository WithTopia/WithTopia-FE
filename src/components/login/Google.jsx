import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const Google = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const GOOGLE_CODE = location.search.split("=")[1];

  const IP = `https://warmwinter.co.kr/member/login/kakao/callback?code=${GOOGLE_CODE}`;

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
