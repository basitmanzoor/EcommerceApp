import React, { useEffect, useState } from "react";

function Orders() {
  const [orderData, setOrderData] = useState([]);

  async function received() {
    const response = await fetch(
      "http://127.0.0.1:8080/api/v1/order/getOrders",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setOrderData(data.data.order);
    console.log(data.data.order);
  }

  useEffect(() => {
    received();
  }, []);

  return (
    <div>
      <h2 id="manageOrder">Manage Orders</h2>
      {orderData.map((item) => (
        <Card item={item} received={received} />
      ))}
    </div>
  );
}

function Card({ item, received }) {
  async function updateOrder(id, status) {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/order/updateOrder/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      }
    );
    const data = await response.json();
    received();
  }
  return (
    <div className="vendorOrders">
      <h3>Order No. :{item._id}</h3>
      <h3>{item.orderBy.name}</h3>
      <h3>
        <img
          src={item.productId.image}
          alt={item.productId.itemName}
          width="40px"
          height="40px"
        />
        {item.productId.itemName}
      </h3>

      <h3>{item.status}</h3>

      <select
        name="status"
        id="orderStatus"
        onChange={(e) => {
          updateOrder(item._id, e.target.value);
        }}
      >
        <option value="pending" defalut>
          Pending
        </option>
        <option value="confirmed">Confirmed</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
}

export default Orders;
