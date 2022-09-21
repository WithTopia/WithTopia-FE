import React from "react";
import "./LoginForm.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/modules/userSlice";
import { useNavigate } from "react-router-dom";


const LoginForm = (props) => {
  
  //userSlice로 전달
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({mode:"onChange"});

  const onSubmit = (payload) => {
    console.log("LV-1", payload);
    dispatch(userLogin(payload));
    console.log("LV-2", payload);
    setTimeout(() => {
      navigate("/main");
    }, 300);
  };

  const goToRegister = () => {
    navigate("/Register");
  };
//google 로그인
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_CLIENT_ID
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`;
  const goToGoogle = () => {
    window.location.href = GOOGLE_AUTH_URL
  };
//kakao 로그인
  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const goToKakao = () => {
    window.location.href = KAKAO_AUTH_URL
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <img src="">logo 이미지</img> */}
      <div className="container">
        <div className="login-box">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="abc123@email.com"
            {...register("email", {
              required: "이메일은 필수입니다.",
              //영문 대소문자,숫자,특수문자 -_. 을 포함한 이메일 형식
              pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{1,8}$/i,
            })}
          />
          {errors.email && errors.email.type === "pattern" && (
            <p> 이메일 형식만 로그인 가능합니다. </p>
          )}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            {...register("password", {
              required: "비밀번호는 필수입니다.",
              pattern: /^[0-9a-zA-Z]{6,}$/,
            })}
          />
          {errors.password && errors.password.type === "pattern" && (
            <p>영문, 숫자 6자리 이상 입력해주세요. </p>
          )}
          </div>          
          <div className="btn">
            <button type="submit">로그인</button>
            <button type="button" onClick={goToRegister}>
              이메일로 회원가입하기
            </button>
          </div>
          <p> </p>
          <span>소셜 계정으로 빠르게 로그인 하기</span>
          <div className="social-btn">
            <button type="button" onClick={goToGoogle} className="google">
              google 로그인
            </button>
            <button type="button" onClick={goToKakao} className="kakao">
              kakao 로그인
            </button>
          </div>
      </div>
    </form>
  );
};

export default LoginForm;
