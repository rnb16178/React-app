import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/*" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

function Users() {
  /* All <Route path> and <Link to> values in this
     component will automatically be "mounted" at the
     /users URL prefix since the <Users> element is only
     ever rendered when the URL matches /users/*
  */
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

    </div>
  );
}

export default App;