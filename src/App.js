import './App.css';
import { useEffect } from 'react';
import MainFrame from './components/mainBox/MainFrame';


const App = () => {
  return (
    <div>
      <div className='layout'>
        <MainFrame></MainFrame>
      </div>
    </div>
  );
}

export default App;
