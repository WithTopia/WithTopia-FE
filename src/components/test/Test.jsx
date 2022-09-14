import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Test = () => {
    const [id,setId] = useState("sddsk1123@naver.com")
    const [pw,setPw] = useState("gml")
    const testData = async () => {
        try{
            const repo = await axios.post("/member/login",{
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
        testData()
    },[])
    return (
    <div>
    </div>
  )
}

export default Test