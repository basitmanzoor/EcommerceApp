import "../App.css";
import React, { useEffect, useState } from "react";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyOrders() {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await fetch(
      "http://127.0.0.1:8080/api/v1/items/bookedproducts",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setNewData(data.data.items);
  }

  return (
    <div className="displayProducts">
      {newData.map((item) => (
        <Card item={item} getProducts={getProducts} key={item._id} />
      ))}
    </div>
  );
}

function Card({ item, getProducts }) {
  const [orderStatus, setOrderStatus] = useState("pending");
  const [orderPlaced, setOrderPlaced] = useState("");

  async function toBuy(item) {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/order/postorder/${item._id}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownedBy: item.ownedBy,
        }),
      }
    );
    const data = await response.json();
    setOrderStatus(data.data.order.status);
    setOrderPlaced(data.status);
    if (data.status === "success") {
      toast("Product purchased successfully");
    }
  }

  async function removeItem(id) {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/items/removeCartProduct/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      getProducts();
      toast("Product successfully removed from the cart");
    }
  }
  return (
    <div className="cardProduct">
      <MDBCard>
        <MDBCardImage src={item.image} position="top" alt={item.itemName} />
        <MDBCardBody>
          <MDBCardTitle>{item.itemName}</MDBCardTitle>
          <MDBCardText>{item.description}</MDBCardText>
          <h5>ORDER STATUS: {orderStatus}</h5>
          <h4>
            {orderPlaced === "success" ? "ORDER PLACED" : "ORDER NOT PLACED"}
          </h4>
          <div className="pricetag">
            <MDBBtn onClick={() => toBuy(item)}>BUY</MDBBtn>
            <MDBBtn onClick={() => removeItem(item._id)}>Remove</MDBBtn>
            <ToastContainer />
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default MyOrders;
