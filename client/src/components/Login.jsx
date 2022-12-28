import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailicon from "../Images/emailicon.png";
import passwordicon from "../Images/passwordicon.png";
import signin from "../Images/signin.svg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert(`Invalid credentials...`);
      console.log(`invalid credentials`);
    } else {
      window.alert(`Login successfully`);
      console.log(`Login successfully`);
      navigate("/");
    }
  };

  return (
    <>
      <section className="signup_signin">
        <div className="container signin_container">
          {/* -----------------form section Starts------------- */}
          <form className="userForm" method="POST">
            <div className="form_Heading">
              <span>Sign In</span>
            </div>
            <div className="inputs_container signin_spacing">
              <label htmlFor="email">
                <img src={emailicon} alt="email icon" />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="inputs_container signin_spacing">
              <label htmlFor="password">
                <img src={passwordicon} alt="password icon" />
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="button_div">
              <button className="submit_btn" onClick={loginUser}>
                Sign In
              </button>
            </div>
          </form>

          {/* -----------------form section Ends------------- */}

          <div className="img_container">
            <figure>
              <img src={signin} alt="signin image" />
            </figure>
            <span>
              Already registered
              <Link to="/signup" className="link">
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
