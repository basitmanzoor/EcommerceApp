import "../App.css";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

function MyProducts() {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await fetch(
      "http://127.0.0.1:8080/api/v1/items/findForShopkeeper/",
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
        <Card item={item} key={item._id} />
      ))}
    </div>
  );
}

function Card({ item }) {
  return (
    <div className="cardProduct">
      <MDBCard>
        <MDBCardImage src={item.image} position="top" alt={item.itemName} />
        <MDBCardBody>
          <MDBCardTitle>{item.itemName}</MDBCardTitle>
          <MDBCardText>{item.description}</MDBCardText>
          <MDBBtn href="#">{item.quantity}</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
export default MyProducts;
