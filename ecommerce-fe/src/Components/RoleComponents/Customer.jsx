import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Customer() {
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/sign");
  }
  return (
    <ul className="navbar">
      <li>
        <Link to="/">PRODUCTS</Link>
      </li>
      <li>
        <Link to="/myorders">MY ORDERS</Link>
      </li>

      <li>
        <Link to="/orderhistory">ORDER HISTORY</Link>
      </li>
      <li>
        <Link onClick={logout} to="/sign">
          LOGOUT
        </Link>
      </li>
    </ul>
  );
}

export default Customer;
