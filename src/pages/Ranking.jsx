import TopRanking from '../components/ranking/TopRanking'
import Header from '../components/header/Header';
import SideBar from '../components/sideBar/SideBar';
import Footer from '../components/footer/Footer';
import "../assets/Global.scss";

const Ranking = () => {
  return (
    <div className='rankings'>
      <Header></Header>
      <div className='ranking-layout'>
        <SideBar/>
        <TopRanking></TopRanking>
      </div>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default Ranking