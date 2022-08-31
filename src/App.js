import './App.css';
import { Route,Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MainBoard from "./pages/MainBoard";
import Profile from "./pages/Profile";
import Ranking from "./pages/Ranking";
import Room from "./pages/Room";
import CreateRoom from "./pages/CreateRoom";
import Login from './pages/Login';
// import openviduLayout from 'openvidu-react/dist/layout/openvidu-layout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainBoard></MainBoard>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/rank' element={<Ranking></Ranking>}></Route>
        <Route path='/main' element={<MainPage></MainPage>}></Route>
        <Route path='/room' element={<Room></Room>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/create' element={<CreateRoom></CreateRoom>}></Route>
        {/* <Route path='/mate' element={<openviduLayout></openviduLayout>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
