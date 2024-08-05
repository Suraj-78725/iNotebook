import React, {useEffect}  from 'react'
import { Link,useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ScrollingText from './ScrollingText';
const  Navbar=()=> {
  let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    // Google Analytics
    console.log(location.pathname);
  }, [location]);

  const handleLogOut=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent" >
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className={`nav-link  ${location.pathname ==="/"?"active":""}`} to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link  ${location.pathname ==="/about"?"active":""}`}to="/about">About</Link>
      </li>
    </ul>
    {!localStorage.getItem('token')?<div className='w-100 mx-3'><form className="float-end">
    <Link className='btn btn-primary mx-2' to="/login" role='button'>Login</Link>
    <Link className='btn btn-primary mx-2' to="/signup" role='button'>Sign UP</Link>
    </form></div>:<div className='mx-3' style={{width:"100%"}}><button style={{float:"inline-end"}} onClick={handleLogOut} className='btn btn-primary'>LogOut</button></div>}
  </div>
</nav>
<ScrollingText/>
</>
  )
}

export default Navbar;