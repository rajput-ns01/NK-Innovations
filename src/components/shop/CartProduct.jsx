import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { NavBar } from './NavBar';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { productData } from '../../lib/data';
import './Home.css';

const Cart = ({ user }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error("All fields are required", { position: "top-center", autoClose: 1000 });
    }

    setShowPaymentForm(false); // Close modal after form submission
    processRazorpayPayment();
  };

  const processRazorpayPayment = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
  
    
  
    var options = {
      key: "rzp_test_4xuP1ttA0IWNzZ",
      amount: totalPrice * 100,
      currency: "INR",
      name: "E-Bharat",
      description: "For testing purpose",
      handler: async function (response) {
        toast.success('Payment Successful');
  
        const orderInfo = {
          cartItems: shoppingCart,
          addressInfo: { name, address, pincode, phoneNumber },
          date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          email: userData.email,
          userid: userData.id,  // ✅ Now safely accessing user ID
          paymentId: response.razorpay_payment_id,
        };
  
        try {
          await addDoc(collection(db, "Online Payment"), orderInfo);
          window.location.reload();
          navigate('/')
        } catch (error) {
          console.error("Error saving order:", error);
        }
      },
      theme: { color: "#3399cc" },
    };
  
    var pay = new window.Razorpay(options);
    pay.open();
  };
  

  const handleCheckout = () => {
    navigate('/customize/cartproducts/cashout');
  };

  return (
    <>
      <NavBar user={user} />
      {shoppingCart.length !== 0 && <h1>Cart</h1>}
      <div className='cart-container'>
        {shoppingCart.length === 0 ? (
          <>
            <div className='info'>No items in your cart.</div>
            <Link to="/">Return to Home page</Link>
          </>
        ) : (
          shoppingCart.map(cart => (
            <div className='cart-card' key={cart.ProductID}>
              <div className='cart-img'><img src={cart.ProductImg} alt="not found" /></div>
              <div className='cart-name'>{cart.ProductName}</div>
              <div className='cart-price-orignal'>Rs {cart.ProductPrice}.00</div>
              <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                <Icon icon={ic_add} size={24} />
              </div>
              <div className='quantity'>{cart.qty}</div>
              <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                <Icon icon={ic_remove} size={24} />
              </div>
              <div className='cart-price'>Rs {cart.TotalProductPrice}.00</div>
              <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                <Icon icon={iosTrashOutline} size={24} />
              </button>
            </div>
          ))
        )}

        {shoppingCart.length > 0 && (
          <div className='cart-summary'>
            <div className='cart-summary-heading'>Cart Summary</div>
            <div className='cart-summary-price'><span>Total Price</span><span>Rs {totalPrice}</span></div>
            <div className='cart-summary-price'><span>Total Qty</span><span>{totalQty}</span></div>

            {/* Cash on Delivery */}
            <button className='btn btn-success btn-md' style={{ marginTop: '5px' }} onClick={handleCheckout}>
              Cash on Delivery
            </button>

            {/* Pay Now (opens form) */}
            <button className='btn btn-primary btn-md' style={{ marginTop: '5px' }} onClick={() => setShowPaymentForm(true)}>
              Pay Now
            </button>
          </div>
        )}
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="payment-form-overlay">
          <div className="payment-form">
            <h2>Enter Details</h2>
            <form onSubmit={handleFormSubmit}>
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
              <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              <button type="submit" className="btn btn-primary">Proceed to Payment</button>
              <button type="button" className="btn btn-danger" onClick={() => setShowPaymentForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
