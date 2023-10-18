import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Create from './pages/create';
import Home from './pages/Home';
import Sismoindividual from './pages/sismoindividual';
import NFTindividual from './pages/NFTindividual';
import Aboutus from './pages/aboutus';
import Live from './pages/Live';
import Header from './pages/Header';

export default function App() {
  
  return (<div>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/live" element={<Live/>}/>
      <Route path="/create" element={<Create/>}/>
      <Route path="/sismo/:id" element={<Sismoindividual/>}/>
      <Route path="/NFT/:id" element={<NFTindividual/>} />
      <Route path="/aboutus" element={<Aboutus/>} />
      {/* <Route path="*" element={<Pagenotfound/>} /> */}
    </Routes></BrowserRouter>

  </div>);
}