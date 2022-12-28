import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const userHomePage = async () => {
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
      setUserName(data.name);
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <>
      <section className="homepage">
        <div className="details">
          <span>Welcome to Arun web solutions</span>
          <h1>{userName}</h1>
        </div>
      </section>
    </>
  );
};

export default Home;
