import { Link } from "react-router-dom";
import AccountButton from "./AccountButton";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <h1>Movie Critic</h1>
        </Link>

        <div className="links">
          <AccountButton />
        </div>
      </nav>
      <br />
    </>
  );
};

export default Navbar;
