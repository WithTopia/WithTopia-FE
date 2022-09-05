import './App.css';
import { Route,Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MainBoard from "./pages/MainBoard";
import Profile from "./pages/Profile";
import Ranking from "./pages/Ranking";
import Room from "./pages/Room";
import Login from './pages/Login';
import Register from './pages/Register';
import FindPw from "./pages/FindPw"
import CreateRoom from "./pages/CreateRoom";
import Chattingbox from "./pages/ChattingBox"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainBoard></MainBoard>}></Route>
        <Route path='/main' element={<MainPage></MainPage>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/rank' element={<Ranking></Ranking>}></Route>
        <Route path='/room' element={<Room></Room>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/findpw' element={<FindPw></FindPw>}></Route>
        {/* <Route path='/create' element={<CreateRoom></CreateRoom>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
