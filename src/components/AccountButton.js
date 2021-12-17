import { Link } from "react-router-dom";
import React from "react";

export default function AccountButton() {


  if(localStorage.getItem("isLoggedIn")==="true"){
    return <Link to="/login">Account</Link>;

  }else{
    return <Link to="/login">Login</Link>;

  }
  
}
