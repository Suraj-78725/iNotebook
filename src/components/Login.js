import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credintials, setcredintials] = useState({email: "", password: ""});
  let navigate = useNavigate();

  // Dynamically set the API base URL based on the environment
  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://inotebook-production-119d.up.railway.app/api' // Replace with your Railway backend URL
    : 'http://localhost:5000/api';  // Use localhost for development

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credintials.email,
        password: credintials.password
      }),
    });

    const json = await response.json();
    
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert("Successfully Logged in", 'success');
      navigate('/');
    } else {
      props.showAlert("Invalid Credentials", 'danger');
    }
  }

  const onChange = (e) => {
    setcredintials({ ...credintials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={onChange}
            id="exampleInputEmail1"
            value={credintials.email}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            id="exampleInputPassword1"
            value={credintials.password}
            name="password"
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default Login;
