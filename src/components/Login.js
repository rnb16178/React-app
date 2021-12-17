import Axios from "axios";
import React, { useState } from "react";
import "../styles/account.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UserReviews from "./UserReviews";
import WatchList from './WatchList';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = (event) => {
    event.preventDefault();
    Axios.post("http://rmcmillan.co.uk/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("username", username);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userID", response.data.userID);


        } else {
          localStorage.setItem("username", "");
          localStorage.setItem("isLoggedIn", false);

        }
      })
      .then(() => {
        window.location.replace("http://localhost:3000");      });
  };

  const logout = () => {
    Axios.post("http://rmcmillan.co.uk/logout", {})
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("username", "");
        localStorage.setItem("isLoggedIn", false);
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  if (localStorage.getItem("isLoggedIn")==="true") {
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Your Details</Tab>
            <Tab>Watch List</Tab>
            <Tab>Reviewed Movies</Tab>
          </TabList>
          <TabPanel>
            <h2>Your Account</h2>
            <h3>22{localStorage.username}22</h3>
            <h3>{localStorage.isLoggedIn}</h3>
            <h3>{localStorage.userID}</h3>
          </TabPanel>
          <TabPanel>
            <h2>Your Watch List</h2>
            <hr></hr>
            <WatchList/>
          </TabPanel>
          <TabPanel>
            <h2>Your reviews</h2>
            <UserReviews />
          </TabPanel>
        </Tabs>
        <button onClick={logout}>Log out</button>
      </div>
    );
  } else {
    return (
      <div className="login-form">
        <form onSubmit={login}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input type="submit" value="submit"></input>
        </form>
      </div>
    );
  }
}
