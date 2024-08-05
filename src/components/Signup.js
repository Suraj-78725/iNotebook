import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credintials, setcredintials] = useState({ name:"",email: "", password: "", cpassword: "" });
  // let history = useHistory();
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const  {name,email,password,cpassword} = credintials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Account created Successfully",'success')
    } else {
      props.showAlert("Invalid Creditial",'danger')
    }
  };
  const onChange = (e) => {
    setcredintials({ ...credintials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label htmlFor="name">Name </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={onChange} name="name"
              aria-describedby="emailHelp"
              placeholder="Enter Name" required
            />
          </div>
          <div className="form-group">
            <label htmlFor="emial">Email address</label>
            <input
              type="email"
              className="form-control"
              id="emial"
              onChange={onChange} name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email" required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={onChange} name="password"
              placeholder="Password" minLength={5} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              onChange={onChange} name="cpassword"
              placeholder="Password" minLength={5} required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
