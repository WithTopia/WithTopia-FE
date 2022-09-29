import React, { useState, useEffect, useRef } from "react";
import "./RegisterForm.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../redux/modules/userSlice";
import axios from "axios";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import logo_empty from '../../assets/logo_empty.webp';
import Loding from '../button/Loding';

  // "email": "이메일@naver.com", 
  // "emailConfirm" :  "123456"
  // "nickname":  "닉네임",
  // "password": "123456",
  // "passwordConfirm" : "123456",

const Registerform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

//이메일 인증메일 보내기
  const [ loading, setLoading ] = useState(null);
  const [ email, setEmail ] = useState("");
  const [waiting,setWaiting] = useState(false)
  //onChange => setState에 value값을 담음
  const onEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  }

  //버튼 onClick을 누르면 실행
  const onEmailRequest = async () => {
    setLoading(true);
    try{ 
      console.log("입력값:",email);
      const data = await axios.post(`/member/email/request`, {
        email
      })
      if(data.data.data === "인증번호 전송 완료! 이메일을 확인해주세요."){
        alert(data.data.data);
        setWaiting(true)
      }
      setLoading(false)
    } 
    catch(error){
      console.log("333",error);
      alert(error.response.data.errormessage)
      if(error.response.data.errormessage === "이메일 양식을 맞춰주세요"){
        setLoading(false)
      }else{
        setLoading(false)
      }
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
      const data = await axios.post(`/member/email/confirm`, {
        email: email,
        authKey: authKey
      })
      console.log(data.data);
      if (data.data.data === true && authKey !== ""){
        alert("인증되었습니다");
        setAuthKey(authKey)
        console.log(data);
        console.log(data.data);
        console.log(data.data.data);
        setAuthKeyCheck({...authKeyCheck, authKeyCheckstatus : true});
      } else if (data.data.data !== true){
        alert("인증번호를 확인해주세요");
      };
    } catch(error){
      console.log(error)
      alert(error.response.data.errormessage)
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
      const data = await axios.post(`/member/nickname`,{
        nickname : nicknameIn
      })
      if(data.data.data === false && nicknameIn !== ""){
        alert("사용가능한 닉네임 입니다");
        console.log(data);
        console.log(data.data);
        console.log(data.data.data);
        setNickname(nicknameIn)
        setNickCheck({...nickCheck, nickCheckStatus : false})
      }else if(data.data.data !== false) {
        alert("사용불가한 닉네임 입니다");
        console.log(data.data.data);
      }
    }catch(error){
      console.log(error);
    };
  };
  
  //비밀번호
  const [ pwType, stePwType ] = useState({
    type: "password",
    visible: false
  });
  const [ pwType2, stePwType2 ] = useState({
    type: "password",
    visible: false
  });
  const handlePwType = event => {
    stePwType(() => {
      if(!pwType.visible) {
        return {type: "text", visible: true};
      }
      return {type: "password", visible: false};
    })
  }
  const handlePwType2 = event => {
    stePwType2(() => {
      if(!pwType2.visible) {
        return {type: "text", visible: true};
      }
      return {type: "password", visible: false};
    })
  }
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
    const reg = password.search(/[!@#$%^&*]/gi);

    if ( email === "" || authKey === "" || nicknameIn === "" || password === "" || passwordConfirm === "" ){
      alert ("빈칸없이 작성해주세요")
    }else if( authKey.length >= 6 && authKeyCheck.authKeyCheckstatus === true ? false : true ) {
      alert ("이메일 인증을 진행해주세요")
    }else if ( nicknameIn.length < 2 || nicknameIn.length > 6 ) {
      alert ("닉네임은 2자~6자 입니다")
    }else if ( nickCheck.nickCheckStatus !== false ) {
      alert ("닉네임 중복확인은 필수입니다")
    }else if ( pw < 0 || pw2 < 0 || reg < 0 ) {
      alert ("비밀번호는 영문, 숫자 조합만 가능합니다.")
    }else if ( password.length < 8 || password.length > 20){
      alert ("비밀번호는 8자 이상 20자 이하만 가능합니다.")
    }else if ( password !== passwordConfirm ){
      alert ("동일한 비밀번호를 입력해주세요")
    }else if(authKeyCheck.authKeyCheckstatus !== true || nickCheck.nickCheckStatus !== false){
      console.log("인증:",authKeyCheck.authKeyCheckstatus,"닉:",nickCheck.nickCheckStatus)
      alert ("모든 인증을 완료해주세요")
    }else {
      dispatch(userRegister(data));
      console.log("인증:",authKeyCheck.authKeyCheckstatus,"닉:",nickCheck.nickCheckStatus)
      console.log("/member/signup으로 보냄",data);
      navigate("/login");
    }
  }

  //뒤로가기
  const goToMain = () => {
    navigate('/login')
  };

  return (
    <div>
      <form className="rg-container" onSubmit={handleSubmit(onSubmitRegister)}>
        <img src={logo_empty} alt='' className="logo"/>
        <p>회원가입</p>
        <div className="register-box">
{/*------------> 이메일<------------*/}          
          <div className="input-email-box">
            <input type="text"
            name="email"
            onChange={onEmail} 
            placeholder="  이메일을 입력하세요"
            />
            <button type="button" onClick={onEmailRequest} className='mail-btn1' disabled={loading}>메일 인증</button>
            {loading && <Loding/>}
            <input type="text" 
            name="authKey"
            onChange={onConfirm} 
            placeholder="  인증번호" 
            />
            <button type="button" onClick={onConfirmNum} className='mail-btn1'>인증 확인</button>
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
            <div>
              <input
              type={pwType.type}
              name="password"
              onChange={onPasswordHandler}
              placeholder="  영문, 숫자, 특수문자 8~20자리"
              />
              <span onClick={handlePwType}>
              {pwType.visible ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
              </span>
            </div>
            <div>
              <input
              type={pwType2.type}
              name="passwordCheck"
              onChange={onPasswordConfirmHandler}
              placeholder="  re-영문, 숫자, 특수문자 8~20자리"
              />
              <span onClick={handlePwType2}>
              {pwType2.visible ? <AiOutlineEye/> :<AiOutlineEyeInvisible/>}
              </span>
            </div>
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
