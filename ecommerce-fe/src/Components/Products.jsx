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

function Products() {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await fetch("http://127.0.0.1:8080/api/v1/items/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setNewData(data.data.items);
  }

  return (
    <>
      <img
        src="https://img.freepik.com/free-photo/attractive-asian-woman-showing-smartphone-app-shopping-bags-buying-online-via-application-standi_1258-156867.jpg?w=1380&t=st=1693449592~exp=1693450192~hmac=26ba0c4398090feb407135e662c63bd0ab9dfe27757002290205d7a7a34d56bb"
        alt="home banner"
        className="banner"
      />
      <div className="displayProducts">
        {newData.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <img
        src="https://img.freepik.com/free-photo/cheerful-shopper-holding-orange-shopping-bag-shoulder-turn-around-camera-with-thumbs-up-recomm_1258-164210.jpg?w=1380&t=st=1693450012~exp=1693450612~hmac=d5b3629d10a5f98acf2e2b1e8b849b7bccfd6edfa81fe5025825733211ec8d60"
        alt="home banner"
        className="banner"
      />
    </>
  );
}

function Card({ item }) {
  async function purchase(id) {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/items/book/${id}`,
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
      toast("Product added to yout cart successfully");
    }
  }
  return (
    <div className="cardProduct">
      <MDBCard>
        <MDBCardImage src={item.image} position="top" alt={item.itemName} />
        <MDBCardBody>
          <MDBCardTitle>{item.itemName}</MDBCardTitle>
          <MDBCardText>{item.description}</MDBCardText>
          <MDBCardText>Quantity: {item.quantity}</MDBCardText>
          <div className="pricetag">
            <h4>$99.9</h4>
            <MDBBtn onClick={() => purchase(item._id)}>Add to Cart</MDBBtn>
            <ToastContainer />
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
export default Products;
