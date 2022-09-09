import './App.css';
import { useEffect } from 'react';
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
      
      <div className='layout'>
      
        <MainFrame></MainFrame>
      </div>
      

    </div>
  );
}

export default App;
