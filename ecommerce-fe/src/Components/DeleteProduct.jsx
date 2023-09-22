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

function DeleteProduct() {
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

  async function deletePro(id) {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      getProducts();
    }
  }
  return (
    <div className="displayProducts">
      {newData.map((item) => (
        <div className="cardProduct" key={item._id}>
          <MDBCard>
            <MDBCardImage src={item.image} position="top" alt="item.itemName" />
            <MDBCardBody>
              <MDBCardTitle>{item.itemName}</MDBCardTitle>
              <MDBCardText>{item.description}</MDBCardText>
              <MDBBtn onClick={() => deletePro(item._id)}>DELETE</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </div>
      ))}
    </div>
  );
}

export default DeleteProduct;
