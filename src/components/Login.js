import Axios from "axios";
import React, { useState } from "react";
import "../styles/account.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UserReviews from "./UserReviews";
import WatchList from "./WatchList";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../login.css"
import { Button } from "@material-ui/core";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    Axios.post("https://rmcmillan.co.uk/api/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("username", username);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userID", response.data.userID);
        } else {
          alert("sorry you have entered an incorrect username or Password")
          localStorage.setItem("username", "");
          localStorage.setItem("isLoggedIn", false);
        }
      })
      .then(() => {
        navigate("/");
      });
  };

  const logout = () => {
    Axios.post("https://rmcmillan.co.uk/api/logout", {})
      .then((response) => {
        localStorage.setItem("username", "");
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("userID", "");

      })
      .then(() => {
        navigate("/");
      });
  };

  if (localStorage.getItem("isLoggedIn") === "true") {
    return (
      <div style={{overflow: "hidden"}}>
        <Navbar />
        <Tabs>
          <TabList>
            <Tab style={{overflow: "hidden"}}>Watch List</Tab>
            <Tab style={{overflow: "hidden"}}>Reviewed Movies</Tab>
          </TabList>
          <TabPanel>
            <h2>Your Watch List</h2>
            <WatchList />
          </TabPanel>
          <TabPanel>
            <h2>Your reviews</h2>
            <UserReviews />
          </TabPanel>
        </Tabs>
        <Button onClick={logout}>Log out</Button>
      </div>
    );
  } else {
    return (
      <>
        <Navbar />

        <div className="login-form">
          <form onSubmit={login}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="input"
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input"
            ></input>
            <Button type="submit" value="submit">Log In</Button>
          </form>
        </div>
      </>
    );
  }
}
