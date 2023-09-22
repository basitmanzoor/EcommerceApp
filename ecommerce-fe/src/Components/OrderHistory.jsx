import React, { useEffect, useState } from "react";

function OrderHistory() {
  const [orderData, setOrderData] = useState([]);

  async function received() {
    const response = await fetch(
      "http://127.0.0.1:8080/api/v1/order/orderhistory",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.data.order);
    setOrderData(data.data.order);
  }

  useEffect(() => {
    received();
  }, []);

  return (
    <div>
      <h2 id="manageOrder">Manage Orders</h2>
      {orderData.map((item) => (
        <Card item={item} />
      ))}
    </div>
  );
}

function Card({ item }) {
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
      <h3>Status: {item.status}</h3>
    </div>
  );
}

export default OrderHistory;
