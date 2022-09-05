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
  } = useForm();

  console.log(watch);

  const onSubmit = (payload) => {
    console.log("LV-1", payload);
    dispatch(userLogin(payload));
    console.log("LV-2", payload);
    setTimeout(() => {
      navigate("/main");
    }, 300);
  };
  console.log("LV-3");

  const goToRegister = () => {
    navigate("/Register");
  };
  const goToGoogle = () => {
    navigate("/Google");
  };
  const goToKakao = () => {
    navigate("/Kakao");
  };

  return (
    <div onSubmit={handleSubmit(onSubmit)}>
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
              pattern: /^[0-9a-zA-Z-_.]*@[0-9a-zA-Z-_.]*\.[a-zA-Z]{2,3}$/i,
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
              //최소 6 자, 대문자 하나 이상, 소문자 하나 및 숫자 하나
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            })}
          />
          {errors.password && errors.password.type === "pattern" && (
            <p>영문, 숫자, 특수문자 혼합하여 8~16자리로 입력해주세요. </p>
          )}
          <div className="btn">
            <button type="submit">로그인</button>
            <button type="button" onClick={goToRegister}>
              이메일로 회원가입하기
            </button>
          </div>
          <div className="social-btn">
            <button type="button" onClick={goToGoogle} className="google">
              google 로그인
            </button>
            <button type="button" onClick={goToKakao} className="kakao">
              kakao 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
