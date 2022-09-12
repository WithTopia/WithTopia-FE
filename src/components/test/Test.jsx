import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Test = () => {
    const [id,setId] = useState("sddsk1123@naver.com")
    const [pw,setPw] = useState("gml")
    const testData = async () => {
        try{
            const repo = await axios.post("/member/login",{
                email:"sddsk1123@naver.com",
                password:"gml"
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
        {/* <h2>내놔.</h2>
        <div className="악으로 깡으로 버텨라">
            <form>
                <button>버튼1</button>
            </form>
        </div> */}
    </div>
  )
}

export default Test