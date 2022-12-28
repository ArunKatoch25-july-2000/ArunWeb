import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        navigate("/login", { replace: true });
        if (!res.status === 200) {
          throw new Error(`Something went wrong`);
        }
      })
      .catch((error) => {
        console.log(`error`);
      });
  });

  return;
  <>
    <h1>logout page</h1>
  </>;
};

export default Logout;
