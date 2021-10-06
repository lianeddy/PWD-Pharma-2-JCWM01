import React from "react";
import { Link } from "react-router-dom";

const Home = () =>{
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/change-pass">Change Password</Link> <br />
      <Link to="/login">Login</Link> <br />
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Home;