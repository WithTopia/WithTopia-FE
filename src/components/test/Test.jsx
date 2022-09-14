import React, { useEffect, useState } from 'react'
import axios from 'axios'
const url = process.env.REACT_APP_SERVER_URL
const Test = () => {
    const testData = async () => {
        try{
            const repo = await axios.post(url+"/member/login",{
                email:"sddsk1123@naver.com",
                password:"gml493312!"
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