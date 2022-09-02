import React from 'react';
import "./LoginForm.scss";
import { useForm } from 'react-hook-form';

const LoginForm = () => {
    
    const { 
        watch, 
        register, 
        handleSubmit, 
        formState:{
            errors,
        } 
    } = useForm();
    // const onSubmit = onSubmit={handleSubmit(onSubmit)}

    return (
        <div >
            <div className="container">
                <div className='login-box'>
                    <input 
                    type="text" 
                    id="email"
                    placeholder='abc123@email.com'
                    {...register('email',{
                        required: ""
                    })}
                    />
                        
                    <input 
                    type="password"
                    id="password"
                    placeholder='******'
                    {...register('password',{
                        required:"최소 6자 이상입니다.",
                        minLength: {
                            value: 6,
                            message: "비밀번호는 최소 6자리 입니다."
                        },
                        maxLength: {
                            value: 12,
                            message: "비밀번호는 최대 12자리를 넘을 수 없습니다."
                        },
                        pattern: {
                            value:""
                        }
                    })}                    
                    />
                    {errors.exampleRequired && <span>This field is required</span>}    
                </div>
                <div className='btn'>
                    <button type='submit'>로그인</button>
                    <button type='submit'>이메일로 회원가입하기</button>
                </div>
                <div className='social-btn'>
                    <button type='submit' className='google'>google 로그인</button>
                    <button type='submit' className='kakao'>kakao 로그인</button>
                </div>    
            </div>
        </div>
    );
}

export default LoginForm;
