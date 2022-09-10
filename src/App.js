import './App.css';
import { useEffect } from 'react';
import Sidebar from './components/sideBar/SideBar';
import Header from './components/header/Header';
import Footer from './footer/Footer';
import MainFrame from './components/mainBox/MainFrame';



const App = () => {
  
  
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
