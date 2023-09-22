import {
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import React from "react";

export default function UpdateProducttModal({
  basicModal,
  setBasicModal,
  toggleShow,
  activeProduct,
}) {
  const updateProduct = async (body) => {
    const result = await fetch(
      `http://127.0.0.1:8080/api/v1/items/${activeProduct._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await result.json();
  };
  const handleUpdate = (e) => {
    const body = {
      image: e.target.image.value,
      itemName: e.target.itemName.value,
      description: e.target.description.value,
    };

    updateProduct(body);
  };
  return (
    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
      <MDBModalDialog>
        <form onSubmit={handleUpdate}>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{activeProduct.itemName}</MDBModalTitle>
              <MDBBtn
                type="button"
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer className="update-form">
                <label className="updateLabel" for="url">
                  Image URL:
                </label>
                <input
                  type="text"
                  id="url"
                  label="Image URL"
                  defaultValue={activeProduct.image}
                  name="image"
                />
                <label className="updateLabel" for="pname">
                  Product Name:
                </label>
                <input
                  type="text"
                  id="pname"
                  label="Product Name"
                  defaultValue={activeProduct.itemName}
                  name="itemName"
                />
                <label className="updateLabel" for="pdesc">
                  Product Description:
                </label>
                <textarea
                  id="pdesc"
                  label="Product Description"
                  defaultValue={activeProduct.description}
                  textarea="true"
                  name="description"
                />
                <MDBBtn className="updateButton" type="submit">
                  Update Product
                </MDBBtn>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </form>
      </MDBModalDialog>
    </MDBModal>
  );
}
