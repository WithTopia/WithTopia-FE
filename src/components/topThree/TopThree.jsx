import React from 'react';
import "./TopThree.scss";
import lion from "../../assets/lion2.png"
import logo from "../../assets/crown.png"

const TopThree = () => {
    const top = [1,2,3,4,5]
    return (
        <div className='top-three'>
            <a href='/rank' className='top-three-font'>
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
            </a>
        </div>
    )
}

export default TopThree