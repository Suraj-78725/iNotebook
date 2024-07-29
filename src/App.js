
import './App.css';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
      <Route exact path="/"element={<Home/>}/>
      <Route exact path="/about"element={<About/>}/>
      {/* <Route exact path="/"element={<Home/>}/> */}
    </Routes>
        </Router>
    </>
  );
}

export default App;
