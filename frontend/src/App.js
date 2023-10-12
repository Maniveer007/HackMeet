import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from './pages/Home';
import Aboutus from './pages/aboutus';
import Live from './pages/Live';
import Header from './pages/Header';
import Create from './pages/create';
// import { ethers } from 'ethers';

export default function App() {
  
  
  
  return (<div>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/live" element={<Live/>}/>
      <Route path="/aboutus" element={<Aboutus/>} />
      <Route path="/create" element={<Create/>}/>

    </Routes></BrowserRouter>

  </div>);
}