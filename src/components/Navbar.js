import React, {useEffect}  from 'react'
import { Link,useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className={`nav-link  ${location.pathname ==="/"?"active":""}`} to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link  ${location.pathname ==="/about"?"active":""}`}to="/about">About</Link>
      </li>
    </ul>
    {!localStorage.getItem('token')?<form className="float-end">
    <Link className='btn btn-primary mx-2' to="/login" role='button'>Login</Link>
    <Link className='btn btn-primary mx-2' to="/signup" role='button'>Sign UP</Link>
    </form>:<button onClick={handleLogOut} className='btn btn-primary'>LogOut</button>}

  </div>
</nav>

  )
}

export default Navbar;