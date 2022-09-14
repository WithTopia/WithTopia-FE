import React, { useEffect, useState } from 'react'
import axios from 'axios'
const url = process.env.REACT_APP_SERVER_URL2
const Test = () => {
    const testData = async () => {
        try{ //  https://warmwinter.co.kr // login
            const repo = await axios.post(url+"/member/login",{
                email:"sddsk1123@naver.com",
                password:"qwer1234!"
            })
            console.log(repo)
            return repo.data
        }catch(error){
           console.log(error)
        }
    }
    useEffect(()=>{
        // testData()
    },[])
    return (
    <div>
    </div>
  )
}

export default Test