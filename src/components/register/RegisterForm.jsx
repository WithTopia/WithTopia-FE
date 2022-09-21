<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import "./RegisterForm.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../redux/modules/userSlice";
import axios from "axios";

  // "email": "이메일@naver.com", 
  // "emailConfirm" :  "123456"
  // "nickname":  "닉네임",
  // "password": "123456",
  // "passwordConfirm" : "123456",

const Registerform = () => {
  // const URI = {
  //   BASE: process.env.REACT_APP_BASE_URI,
  // };
  const URL = process.env.REACT_APP_SERVER_URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

//이메일 인증메일 보내기
  const [ email, setEmail ] = useState("");
  //onChange => setState에 value값을 담음
  const onEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  }
  //버튼 onClick을 누르면 실행
  const onEmailRequest = async () => {
    try{ 
      alert("인증메일이 발송되었습니다. 메일 도착까지 최대 5분이 소요될 수 있습니다.")
      console.log("입력값:",email);
      const data = await axios.post(`${URL}/member/email/request`, {
        email
      })
    } 
    catch(error){
      console.log("333");
    }
  };
  
//인증번호 입력
  const [ authKey, setAuthKey ] = useState("");
  const [ authKeyCheck, setAuthKeyCheck ] = useState({
    authKeyCheckstatus : false
  });
  //onChange로 입력값을 setState에 담음.
  const onConfirm = (event) => {
    event.preventDefault();
    setAuthKey(event.target.value);
  }
  //버튼 onClick을 누르면 실행
  const onConfirmNum = async () => {
    try{
      console.log("입력값:",authKey);
      const data = await axios.post(`${URL}/member/email/confirm`, {
        email: email,
        authKey: authKey
      })
      if (data.data === true && authKey !== ""){
        alert("인증되었습니다");
        setAuthKey(authKey)
        setAuthKeyCheck({...authKeyCheck, authKeyCheckstatus : true});
      } else if (data.data !== true){
        alert("인증번호를 확인해주세요");
      };
    } catch(error){
      console.log(error)
    };
  };
  
//닉네임 중복
  const [ nicknameIn, setNickname ] = useState("");
  const [ nickCheck, setNickCheck ] = useState({
    nickCheckStatus : true
  });  
  //onChange로 입력값을 setState에 담음
  const onNickHandler = (event) => {
    const nickHandler = event.target.value;
    setNickname(nickHandler);
  };
  //버튼 onClick을 누르면 실행
  const onNickCheck = async () => {
    try{
      console.log("잡은 nick:",nicknameIn);
      console.log(watch());
      const data = await axios.post(`${URL}/member/nickname`,{
        nickname : nicknameIn
      })
      console.log(data.data);
      if(data.data === false && nicknameIn !== ""){
        alert("사용가능한 닉네임 입니다");
        setNickname(nicknameIn)
        setNickCheck({...nickCheck, nickCheckStatus : false})
      }else if(data.data !== false) {
        alert("사용불가한 닉네임 입니다");
        console.log(data.data);
      }
    }catch(error){
      console.log(error);
    };
  };
  
  //비밀번호
  const [ password, setPassword ] = useState("");
  const onPasswordHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  }
  const [ passwordConfirm, setPasswordConfirm ] = useState("");
  const onPasswordConfirmHandler = (event) => {
    event.preventDefault();
    setPasswordConfirm(event.target.value);
  }
  
  const data = {
    email : email,
    authKey : authKey,
    nickname : nicknameIn,
    password : password,
    passwordConfirm : passwordConfirm,
  };
  //email authKey nicknameIn password passwordConfirm nickCheck
  const onSubmitRegister = () => {
    const pw = password.search(/[0-9]/g);
    const pw2 = password.search(/[a-z]/ig);

    if ( email === "" || authKey === "" || nicknameIn === "" || password === "" || passwordConfirm === "" ){
      alert ("빈칸없이 작성해주세요")
    }else if( authKey.length >= 6 && authKeyCheck.authKeyCheckstatus === true ? false : true ) {
      alert ("이메일 인증을 진행해주세요")
    }else if ( nickCheck.nickCheckStatus === true ? true : false ) {
      alert ("닉네임 중복확인은 필수입니다")
    }else if ( pw < 0 || pw2 < 0 || password.length < 5){
      alert ("비밀번호는 영문, 숫자 조합으로 6자 이상만 가능합니다.")
    }else if ( password !== passwordConfirm ){
      alert ("동일한 비밀번호를 입력해주세요")
    }else{
    dispatch(userRegister(data));
    console.log("/member/signup으로 보냄",data);
    alert("회원가입 성공")
    navigate("/login");
    }
  }

  //뒤로가기
  const goToMain = () => {
    navigate('/')
  };






  return (
    <div>
      <form className="rg-container" onSubmit={handleSubmit(onSubmitRegister)}>
        <p>회원가입</p>
        <div className="register-box">
{/*------------> 이메일<------------*/}          
          <div className="input-email-box">
            <input type="text"
            name="email"
            onChange={onEmail} 
            placeholder="  이메일을 입력하세요"
            />
            <button type="button" onClick={onEmailRequest}>메일 인증</button>
            <p>
            {errors.email && errors.email.type === 
            "pattern" && <p> 이메일 형식만 로그인 가능합니다. </p>}
            </p>
            
            <input type="text" 
            name="authKey"
            onChange={onConfirm} 
            placeholder="  인증번호" 
            />
            <button type="button" onClick={onConfirmNum}>인증 확인</button>
          </div>
{/*------------> 닉네임 <------------*/}
          <div className="input-nick-box">
            <input 
            type="text" 
            name="nickname"
            onChange={onNickHandler}
            placeholder="  닉네임을 입력하세요" 
            />
            <span>
              {errors.nickname && errors.nickname.type === "minLength" &&(
                <p>닉네임은 2자 이상 입력해주세요.</p>
              )}
            </span>
            <button type="button" onClick={onNickCheck} >중복 확인</button>
          </div>
{/*------------> 패스워드 <------------*/}
          <div className="input-password-box">
            <input
            type="password"
            name="password"
            onChange={onPasswordHandler}
            placeholder="  password"
            />
            <span>
              {errors.password && errors.password.type === "pattern" && (
              <p>영문, 숫자 6자리 이상으로 입력해주세요. </p>)}
            </span>
            <input
            type="password"
            name="passwordCheck"
            onChange={onPasswordConfirmHandler}
            placeholder="  passwordCheck"
            />
            <span>
              {errors.password !== errors.passwordCheck && (
              <p>동일한 비밀번호를 입력해주세요. </p>)}
            </span>
          </div>
        </div>
{/*------------> 소셜로그인 <------------*/}        
        <div className="btn">
          <button type="submit">회원가입</button>
          <button type="button" onClick={goToMain}>뒤로가기</button>
        </div>
      </form>
    </div>
  );
};

export default Registerform;
=======
>>>>>>> origin/second-merge
