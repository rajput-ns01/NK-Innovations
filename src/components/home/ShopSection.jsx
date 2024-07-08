import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import '../styles/styles.css'; // Import CSS file
const ShopSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Function to fetch products from Firestore
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, 'Products');
        const q = query(productsCollectionRef, limit(4));
        const productsCollection = await getDocs(q);
        const productsData = productsCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-img">
              <img src={product.ProductImg} alt={product.ProductName} />
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.ProductName}</h3>
              <p className="product-price">Price: ${product.ProductPrice}</p>
              <p className="product-stock">Stock: {product.ProductStock}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Add a button to navigate to the shop page */}
      <a href="/shop" className="shop-button">Shop All Products</a>
      </div>
  );
};

export default ShopSection;
