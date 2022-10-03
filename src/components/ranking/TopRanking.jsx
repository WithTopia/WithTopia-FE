import React, { useEffect, useState , useRef} from 'react';
import "./TopRanking.scss";
import crown from '../../assets/crown.png';
import crown2 from '../../assets/crown2.png';
import crown3 from '../../assets/crown3.png';
import crown4 from '../../assets/crown4.png';
import like from "../../assets/like.png";
import axios from 'axios';

const Topranking = () => {
  const [rank,setRank] = useState("")
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // use this if you want the box to say "loading...". Forgot this lol.
  const [prevY, setPrevY] = useState(0);

  let rankRef = useRef({});
  let loadingRef = useRef(null);
  let prevYRef = useRef({});
  let pageRef = useRef({});

  rankRef.current = rank;
  pageRef.current = page;
  prevYRef.current = prevY;

  const ranking = async () => {
    try{
      const repo = await axios.get(`/rank/${pageRef.current}`)
      // setRank(repo.data.data.content)
      setRank([...rankRef.current,...repo.data.data.content])
      setLoading(false);
    }catch(error){
    }
  }  
  const handleObserver = (entities, observer) => {
      const y = entities[0].boundingClientRect.y;
      if (prevYRef.current > y) {
        ranking()  
        setPage(pageRef.current + 1);
      }
      setPrevY(y);
  };
  useEffect(()=>{
    ranking()
    setPage(pageRef.current + 1);
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(loadingRef.current);
  },[])
  return (
    <div>
      <div className='rank-box'>
        <div className='rank-top3'>WITTO of HONOR</div>
        <hr/>
          {rank !== "" ? rank.map((ranks,index)=>{
            return(
              <div className={
                index === 0 ? 'rankTop' :
                index === 1 ? 'rankTop' :
                index === 2 ? 'rankTop' : 'rank-piece'} key={index}>
                <div className='rank-left'>

                  {index === 0 ? <img src={crown} alt="crown" className='crown'/> :
                    index === 1 ? <img src={crown2} alt="crown" className='crown'/> : 
                    index === 2 ? <img src={crown3} alt="crown" className='crown'/> :null}
                    {/* index === 3 ? <img src={crown4} alt="crown" className='crown'/> :
                    index === 4 ? <img src={crown4} alt="crown" className='crown'/> :  */}
                  
                  {index < 3 ? <div className='rank-top-ranking'>{index+1+"등"}</div> : 
                  <div className='rank-low-ranking'>{index+1+"등"}</div>}
                  
                </div>
                <div className='rank-center'>
                  <img src={ranks.profileImage} alt="profile" className='bar-profile-img'/>
                  <div className='rank-nickname'>{ranks.nickName.split('_',1)}</div>
                </div>
                <div className='rank-right'>
                  <img src={like} className='rank-like' alt='rank'></img>
                  <div className='rank-like-count'>{ranks.likeCount}</div>
                </div>
              </div>
            )
          }) : null}
        <div
          className="scrolldown"
          ref={loadingRef}
          style={{ height: "50px" }}>
          {loading && "...Loading"}
        </div>
      </div>
    </div>
  );
}

export default Topranking;
