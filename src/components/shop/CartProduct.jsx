import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { NavBar } from './NavBar';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productData } from '../../lib/data'; // Import productData
import './Home.css';

const Cart = ({ user }) => {
  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
  const navigate = useNavigate();

  // Function to check if all required materials for the selected products are in the cart
  const areAllMaterialsSelected = () => {
    const requiredMaterials = new Set();
    const selectedMaterials = new Set();

    // Iterate over shoppingCart to gather selected materials and required materials
    shoppingCart.forEach(item => {
      const product = productData[item.category]?.find(p => p.name === item.ProductName);

      if (product) {
        // Add required materials for the product to the requiredMaterials set
        product.materials.forEach(material => requiredMaterials.add(material));
      }

      // Add materials in cart to selectedMaterials set
      if (item.materialName) {
        selectedMaterials.add(item.materialName);
      }
    });

    // Check if all required materials are selected
    console.log('Required Materials:', [...requiredMaterials]);
    console.log('Selected Materials:', [...selectedMaterials]);

    return [...requiredMaterials].every(material => selectedMaterials.has(material));
  };

  // Handle checkout button click
  const handleCheckout = () => {
    if (areAllMaterialsSelected()) {
      navigate('/customize/cartproducts/cashout');
    } else {
      toast.error('Please select all required materials before proceeding to checkout', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  return (
    <>
      <NavBar user={user} />
      <>
        {shoppingCart.length !== 0 && <h1>Cart</h1>}
        <div className='cart-container'>
          {shoppingCart.length === 0 && (
            <>
              <div>No items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
              <div><Link to="/">Return to Home page</Link></div>
            </>
          )}
          {shoppingCart.map(cart => (
            <div className='cart-card' key={cart.ProductID}>
              <div className='cart-img'>
                <img src={cart.ProductImg} alt="not found" />
              </div>
              <div className='cart-name'>{cart.ProductName}</div>
              <div className='cart-price-orignal'>Rs {cart.ProductPrice}.00</div>
              <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                <Icon icon={ic_add} size={24} />
              </div>
              <div className='quantity'>{cart.qty}</div>
              <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                <Icon icon={ic_remove} size={24} />
              </div>
              <div className='cart-price'>
                Rs {cart.TotalProductPrice}.00
              </div>
              <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                <Icon icon={iosTrashOutline} size={24} />
              </button>
            </div>
          ))}
          {shoppingCart.length > 0 && (
            <div className='cart-summary'>
              <div className='cart-summary-heading'>Cart-Summary</div>
              <div className='cart-summary-price'>
                <span>Total Price</span>
                <span>{totalPrice}</span>
              </div>
              <div className='cart-summary-price'>
                <span>Total Qty</span>
                <span>{totalQty}</span>
              </div>
              <button 
                className='btn btn-success btn-md' 
                style={{ marginTop: '5px' }} 
                onClick={handleCheckout}
              >
                Cash on delivery
              </button>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default Cart;
