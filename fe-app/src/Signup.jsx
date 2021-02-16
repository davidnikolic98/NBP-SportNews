import React, { useEffect, useState } from "react";
import "./Login.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const UsernameString = "Username";
  const PasswordString = "Password";
  const [nesto, setNesto] = useState(0);
  const postUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "Username": name, "Password": password }),
    };
    const response = await fetch(
      "https://localhost:5001/ContentCreators/AddUser",
      requestOptions
    );
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateLastname = (e) => {
    setLastname(e.target.value);
  };

  const updateAddess = (e) => {
    setAddress(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="backgroung">
      <div className="effect">
        <div className="effect4">
          <div className="divLogin">
            Welcome
            <p>glad to see you!</p>
            <br />
            <br />
            <br />
            <br />
            <input className="inputLoginn" placeholder="Email" type="text" />
            <br />
            <br />
            <input
              className="inputLoginn"
              placeholder="Password"
              type="password"
            />
            {nesto ? (
              <p className="error">Incorrect username or password!</p>
            ) : (
              <p className="error"></p>
            )}
            <p className="error"></p>
            <button id="buttonLogin" type="submit">
              LOGIN
            </button>
          </div>
        </div>
        <div className="effect2">
          <div className="divSignup">
            <br />
            <input
              className="inputSignup"
              placeholder="Name"
              type="text"
              value={name}
              onChange={updateName}
            />
            <br />
            <br />
            <br />
            <input
              className="inputSignup"
              placeholder="Password"
              type="text"
              value={password}
              onChange={updatePassword}
            />
            {nesto ? (
              <p className="error">All fields are required!</p>
            ) : (
              <p className="error"></p>
            )}
            <button id="buttonSingUp" onClick={postUser}>
              CREATE ACCOUNT
            </button>
          </div>
        </div>
        <div className="proba2">
          Sport
          <br />
          News
          <br />
          <br />
          <Link to="/login">
            <button id="btnLogin">LOGIN</button>
          </Link>
        </div>
      </div>
      <div id="iks">
        <Link to="/news">BACK</Link>
      </div>
    </div>
  );
}
