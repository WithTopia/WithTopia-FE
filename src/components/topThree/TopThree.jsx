import React from 'react';
import "./TopThree.scss";
// import lion from "../../assets/lion2.png"
// import logo from "../../assets/crown.png"
import { useState } from 'react';

const TopThree = () => {
    const [topRanker,setTopRanker] = useState([{
        rank:1,
        name:"Hyun",
        img:"https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/original.jpeg",
    },
    {
        rank:2,
        name:"Hyun",
        img:"https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/original.jpeg",
    },
    {
        rank:3,
        name:"Hyun",
        img:"https://hanghae99-wonyoung.s3.ap-northeast-2.amazonaws.com/original.jpeg",
    }])
    return (
        <div className='top-three'>
            {/* <a href='/rank' className='top-three-font'>
            <div className='top-text-content'>
                <div className='top-rank-text'>명예의 위토</div>
                <img src={lion} className="lion"></img>
            </div>
            <div className='top-container'>
                {top.map((items,index)=>{
                    return(
                        <div className='items' key={index}>
                            <img src={logo} className="crown-size" style={{width:"35px",marginRight:"6px"}}></img> 김근육
                        </div>
                    )
                })}    
            </div>
            </a> */}
        </div>
    )
}

export default TopThree