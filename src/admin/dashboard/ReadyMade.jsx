import React, { useEffect, useState } from 'react'; 
import { db } from '../../lib/firebase'; // Adjust the import based on your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import './dashboard.css';

const ReadyMadeProductOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, 'ReadyMadeProductOrders');
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
      <h2>Ready-Made Product Orders</h2>
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
                  {order.Products.map(product => (
                    <div key={product.ProductID}>
                      <p>{product.ProductName} (Qty: {product.qty})</p>
                    </div>
                  ))}
                </td>
                <td>{new Date(order.Timestamp).toLocaleString()}</td>
                <td>{order.UserID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReadyMadeProductOrders;
