import { Link } from "react-router-dom";

function Shopkeeper({ navigate }) {
  function logout() {
    localStorage.clear();
    navigate("/sign");
  }
  return (
    <ul className="navbar">
      <li>
        <Link to="/myproducts">MY PRODUCTS</Link>
      </li>
      <li>
        <Link to="/add">ADD PRODUCTS</Link>
      </li>
      <li>
        <Link to="/update">UPDATE PRODUCTS</Link>
      </li>
      <li>
        <Link to="/delete">DELETE PRODUCTS</Link>
      </li>
      <li>
        <Link to="/orders">MY ORDERS</Link>
      </li>
      <li>
        <Link onClick={logout} to="/sign">
          LOGOUT
        </Link>
      </li>
    </ul>
  );
}

export default Shopkeeper;
