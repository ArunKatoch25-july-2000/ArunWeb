import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import signup from "../Images/signupimg.svg";
import nameimg from "../Images/nameimg.png";
import emailicon from "../Images/emailicon.png";
import phone from "../Images/phone.png";
import work from "../Images/work.png";
import passwordicon from "../Images/passwordicon.png";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert(`Something went wrong`);
      console.log("error occured");
    } else {
      window.alert(`Signup Successfull go back and login`);
      console.log(`Signup Successfull go back and login`);
      navigate("/login");
    }
  };

  return (
    <>
      <section className="signup_signin">
        <div className="container">
          {/* -----------------form section Starts------------- */}
          <form method="POST" className="userForm">
            <div className="form_Heading">
              <span>Sign Up</span>
            </div>

            <div className="inputs_container">
              <label htmlFor="name">
                <img src={nameimg} alt="name icon" />
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleInputs}
                required
              />
            </div>

            <div className="inputs_container">
              <label htmlFor="email">
                <img src={emailicon} alt="email icon" />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleInputs}
                required
              />
            </div>

            <div className="inputs_container">
              <label htmlFor="phone">
                <img src={phone} alt="Phone icon" />
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter your phone"
                value={user.phone}
                onChange={handleInputs}
                required
              />
            </div>

            <div className="inputs_container">
              <label htmlFor="profession">
                <img src={work} alt="Phone icon" />
              </label>
              <input
                type="text"
                name="work"
                id="profession"
                placeholder="Enter your profession"
                value={user.work}
                onChange={handleInputs}
                required
              />
            </div>
            <div className="inputs_container">
              <label htmlFor="password">
                <img src={passwordicon} alt="password icon" />
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleInputs}
                required
              />
            </div>
            <div className="inputs_container">
              <label htmlFor="cpassword">
                <img src={passwordicon} alt="password icon" />
              </label>
              <input
                type="text"
                name="cpassword"
                id="cpassword"
                placeholder="confirm your password"
                value={user.cpassword}
                onChange={handleInputs}
                required
              />
            </div>

            <div className="button_div">
              <button
                className="submit_btn"
                type="submit"
                value="register"
                onClick={PostData}
              >
                Register
              </button>
            </div>
          </form>

          {/* -----------------form section Ends------------- */}

          <div className="img_container">
            <Link to="/logout" className="logout_link">
              logout
            </Link>
            <figure>
              <img src={signup} alt="signup image" />
            </figure>
            <span>
              Already registered
              <Link to="/login" className="link">
                SignIn
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
