import { Link } from "react-router-dom";

function Admin({ navigate }) {
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
        <Link onClick={logout} to="/sign">
          LOGOUT
        </Link>
      </li>
    </ul>
  );
}

export default Admin;
