import './App.css';
import { useEffect } from 'react';
import Sidebar from './components/sideBar/SideBar';
import Header from './components/header/Header';
import Footer from './footer/Footer';
import MainFrame from './components/mainBox/MainFrame';



const App = () => {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <div>
      <Header/>
      <div className='layout'>
        <Sidebar></Sidebar>
        <MainFrame></MainFrame>
      </div>
      <Footer></Footer>

    </div>
  );
}

export default App;
