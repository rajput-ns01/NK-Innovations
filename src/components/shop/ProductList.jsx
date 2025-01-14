import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import './Home.css';
import { CartContext } from './CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product });

    // Show success toast for adding product
    toast.success('Product added to cart', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  const buyNow = (product) => {
    // Add product to cart
    addToCart(product);

    // Redirect to the cart page
    navigate('/shop/cartproducts');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Products'));
        const productsList = querySnapshot.docs.map(doc => ({
          ProductID: doc.id,
          ...doc.data()
        }));

        setProducts(productsList);
        setLoading(false); // Set loading to false after fetching products
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {products.length !== 0 && <h1>Products</h1>}
      <div className='products-container'>
        {products.length === 0 && <div>Slow internet... No products to display.</div>}
        {products.map(product => (
          <div className='product-card' key={product.ProductID}>
            <div className='product-img'>
              <img src={product.ProductImg} alt="Product" />
            </div>
            <div className='product-name'>
              {product.ProductName}
            </div>
            <div className='product-price'>
              Rs {product.ProductPrice}.00
            </div>
            <div className='product-stock'>
              Available Stock: {product.ProductStock}
            </div>
            <div className="button-group">
              <button className='addcart-btn' onClick={() => addToCart(product)}>ADD TO CART</button>
              <button className='addcart-btn' style={{backgroundColor:'#4CAF50'}} onClick={() => buyNow(product)}>BUY NOW</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
