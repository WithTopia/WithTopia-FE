import './App.css';
import { useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import MainPage from './pages/MainPage';
// import MainBoard from "./pages/MainBoard";
// import Profile from "./pages/Profile";
// import Ranking from "./pages/Ranking";
// import Room from "./pages/Room";
// import Login from './pages/Login';
// import Register from './pages/Register';
// import CreateRoom from "./pages/CreateRoom";
// import Chattingbox from "./pages/ChattingBox"
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
