import React from "react";
import "./RegisterForm.scss";
import { useForm } from "react-hook-form";

const Registerform = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(watch());

  // "nickname":  "닉네임",
  // "email": "이메일@naver.com",
  // "password": "123456",
  // "passwordConfirm" : "123456",
  // "emailConfirm" :  true

  return (
    <div>
      <form className="rg-container">
        <p>회원가입</p>
        <div className="register-box">
          <div className="input-email-box">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="  이메일을 입력하세요"
              {...register("email", {
                required: false,
                //영문 대소문자,숫자,특수문자 -_. 을 포함한 이메일 형식
                pattern: /^[0-9a-zA-Z!@#-_.]*@[0-9a-zA-Z-_.]*\.[a-zA-Z]{2,3}$/i,
                // validate: () => isEmailCheck(false)
              })}
            />
            <button type="button">메일 인증</button>
            <p>
              {errors.email && errors.email.type === 
              "pattern" && <p> 이메일 형식만 로그인 가능합니다. </p>}
            </p>
            
            <input 
            type="text" 
            placeholder="  인증번호" 
            />
            <button type="button">인증 확인</button>
          </div>
          
          <input 
          type="nickname" 
          placeholder="  닉네임을 입력하세요" 
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="  password"
            {...register("password", {
              required: false,
              //최소 6 자, 대문자 하나 이상, 소문자 하나 및 숫자 하나
              pattern:/^[0-9a-zA-Z!@#-_.]{6,}$/,
            })}
          />
          <span>
            {errors.password && errors.password.type === "pattern" && (
              <p>영문, 숫자, 특수문자 혼합하여 8~16자리로 입력해주세요. </p>
            )}
          </span>
          <input
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            placeholder="  Re-password"
            {...register("password", {
              required: false,
              //최소 6 자, 대문자 하나 이상, 소문자 하나 및 숫자 하나
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            })}
          />
        </div>

        <span>
          {errors.password && errors.password.type === "pattern" && (
            <p>영문, 숫자, 특수문자 혼합하여 8~16자리로 입력해주세요. </p>
          )}
        </span>
        <div className="btn">
          <button type="submit">회원가입</button>
          <button type="button">뒤로가기</button>
        </div>
      </form>
    </div>
  );
};

export default Registerform;
