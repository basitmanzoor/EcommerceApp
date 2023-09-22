import React, { useState } from "react";
import "../App.css";

import { MDBInput, MDBContainer, MDBBtn } from "mdb-react-ui-kit";

function AddProduct() {
  const [image, setImage] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  if (localStorage.getItem("role") !== "shopkeeper") {
    return <h4>You don't have acess to this page</h4>;
  }

  const addItem = async () => {
    // console.warn(image, itemName, description);
    const response = await fetch("http://127.0.0.1:8080/api/v1/items/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image, itemName, description }),
    });
    const data = await response.json();
  };

  return (
    <form>
      <MDBContainer className="p-5 addForm">
        <MDBInput
          type="text"
          id="addForm1"
          wrapperClass="mb-4"
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <MDBInput
          type="text"
          id="addForm2"
          wrapperClass="mb-4"
          label="Product Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-5"
          type="textarea"
          id="addForm3"
          rows={4}
          label="Product Description"
          value={description}
          textarea="true"
          onChange={(e) => setDescription(e.target.value)}
        />

        <MDBBtn className="mb-4" onClick={addItem} block>
          ADD PRODUCT
        </MDBBtn>
      </MDBContainer>
    </form>
  );
}

export default AddProduct;
