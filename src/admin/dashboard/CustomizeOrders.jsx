import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './dashboard.css';
import { Button } from 'bootstrap';
import { useNavigate } from 'react-router-dom';

const CustomizeProductOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, 'CustomizeProductOrders');
        const orderSnapshot = await getDocs(ordersCollection);
        const ordersList = orderSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container1">
      <h2>Customized Product Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        <table className="orders-table1">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer Name</th>
              <th>Email</th>
              <th>Cell</th>
              <th>Address</th>
              <th>Payment (₹)</th>
              <th>Quantity</th>
              <th>Products</th>
              <th>Order Timestamp</th>
              <th>User ID</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.BuyerName}</td>
                <td>{order.BuyerEmail}</td>
                <td>{order.BuyerCell}</td>
                <td>{order.BuyerAddress}</td>
                <td>{order.BuyerPayment}</td>
                <td>{order.BuyerQuantity}</td>
                <td>
                  <select className="product-dropdown">
                    {order.Products.map(product => (
                      <option key={product.ProductID} value={product.ProductID}>
                        {product.ProductName} - {product.category} - {product.materialName} (Qty: {product.qty})
                      </option>
                    ))}
                  </select>
                </td>
                <td>{new Date(order.Timestamp).toLocaleString()}</td>
                <td>{order.UserID}</td>
                <td><button onClick={()=>{navigate('./invoice-detail',{state:order})}}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomizeProductOrders;
