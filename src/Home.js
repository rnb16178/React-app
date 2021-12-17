import React from "react";

function Home() {
   
  if (localStorage.getItem("isLoggedIn")==="true") {
    return <div>You are logged in {localStorage.isLoggedIn}</div>;
  } else {
    return <div>You are not logged in</div>;
  }
}

export default Home;
