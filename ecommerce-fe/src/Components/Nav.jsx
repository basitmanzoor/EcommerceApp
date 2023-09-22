import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Customer from "./RoleComponents/Customer";
import Shopkeeper from "./RoleComponents/Shopkeeper";
import Admin from "./RoleComponents/Admin";

import "../App.css";

function Nav() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  let decodedToken = {};
  // const [role, setRole] = useState("");
  if (auth) {
    decodedToken = jwt_decode(auth);
    localStorage.setItem("role", decodedToken.role);
  }
  // const decodedToken = jwt_decode(auth);
  // setRole(decodedToken.role);

  return (
    <div className="header">
      {auth ? (
        <Home auth={auth} navigate={navigate} role={decodedToken.role} />
      ) : (
        <Register />
      )}
    </div>
  );
}

function Home({ navigate, role }) {
  if (role === "admin") {
    return <Admin navigate={navigate} />;
  }
  if (role === "shopkeeper") {
    return <Shopkeeper navigate={navigate} />;
  }
  if (role === "customer") {
    return <Customer navigate={navigate} />;
  }
}

function Register() {
  return (
    <ul className="navbar">
      <li>
        <Link to="/sign">REGISTER</Link>
      </li>
    </ul>
  );
}
export default Nav;
