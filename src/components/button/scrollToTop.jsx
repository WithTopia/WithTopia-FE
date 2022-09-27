import React,{ useState, useEffect } from 'react';
import './scrollToTop.scss';

const Scrolltotop = () => {
  const [ showBtn, setShowBtn ] = useState(false);

  const topToScroll = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleShowButton = () => {
      if(window.scrollY > 1000){
        setShowBtn(true)
      }else{
        setShowBtn(false)
      }
    }
    console.log(window.scrollY)
    window.addEventListener("scroll",handleShowButton)
    return () => {
      window.removeEventListener("scroll",handleShowButton)
    }
  },[])

  return showBtn && (
    <div className='scroll-btn'>
      <button name='top' onClick={topToScroll} className='top-btn'>TOP</button>
    </div>
  );
}

export default Scrolltotop;
