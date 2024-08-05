import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
 
  const [credintials, setcredintials] = useState({email:"",password:""});
  // let history = useHistory();
  let navigate = useNavigate();
  const handlesubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       },
       body: JSON.stringify({email:credintials.email,password:credintials.password}),
   
    });
    const json=await response.json();
    // console.log(json);
    if(json.success){
      // save the auth token and redirect 
      localStorage.setItem('token',json.authToken);
      props.showAlert("Successfully Loggined",'success');
      navigate('/');
    }else{
      props.showAlert("Invalid Creditial",'danger')
    }
  }
  const onChange = (e) => {
    setcredintials({...credintials, [e.target.name]: e.target.value });
  };


  return (
    <>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onChange} id="exampleInputEmail1" value={credintials.email}
            aria-describedby="emailHelp" name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control" value={credintials.password}
            onChange={onChange} id="exampleInputPassword1" name="password"
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
