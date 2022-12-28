import React, { useState, useEffect } from "react";
import android from "../Images/android.png";
import mail from "../Images/mail.png";
import address from "../Images/address.png";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const callContactPage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!res.status === 200) {
        throw new Error(`Something went wrong`);
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);

  // Storing data in states
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Send message data in backend
  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log(`message not send`);
    } else {
      console.log(`message send successfully `);
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <section className="contact">
        <div className="contact_details_container">
          <div className="contact_details">
            <figure>
              <img src={android} alt="phone" />
            </figure>
            <div className="contact_heading">
              <p>Phone</p>
              <span>+91 862XXXXX09</span>
            </div>
          </div>

          <div className="contact_details">
            <figure>
              <img src={mail} alt="Email" />
            </figure>
            <div className="contact_heading">
              <p>Email</p>
              <span>akinfo554@gmail.com</span>
            </div>
          </div>

          <div className="contact_details">
            <figure>
              <img src={address} alt="address" />
            </figure>
            <div className="contact_heading">
              <p>Address</p>
              <span>Kasauli Town, 173204 HP</span>
            </div>
          </div>
        </div>

        <div className="get_In_Touch_Container">
          <h1>Get in touch</h1>
          <form method="POST">
            <div className="contact_inputs">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={userData.name}
                onChange={handleInputs}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={userData.email}
                onChange={handleInputs}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Your Phone Number"
                value={userData.phone}
                onChange={handleInputs}
                required
              />
            </div>
            <div className="textarea_container">
              <textarea
                className="textarea"
                name="message"
                maxLength="500"
                value={userData.message}
                placeholder="Your message"
                onChange={handleInputs}
              />
            </div>
            <div className="contact_sumit">
              <button type="submit" onClick={contactForm}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
