import "../App.css";
import React, { useEffect, useState } from "react";
import UpdateProducttModal from "./UpdateProductModal";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

function UpdateProduct() {
  const [newData, setNewData] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [activeProduct, setActiveProduct] = useState("");

  const toggleShow = () => setBasicModal(!basicModal);

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
        <div className="cardProduct" key={item._id}>
          <MDBCard>
            <MDBCardImage src={item.image} position="top" alt="item.itemName" />
            <MDBCardBody>
              <MDBCardTitle>{item.itemName}</MDBCardTitle>
              <MDBCardText>{item.description}</MDBCardText>

              <MDBBtn
                onClick={() => {
                  setActiveProduct(item);
                  toggleShow();
                }}
              >
                UPDATE
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </div>
      ))}
      <UpdateProducttModal
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        activeProduct={activeProduct}
        toggleShow={toggleShow}
      />
    </div>
  );
}

export default UpdateProduct;
