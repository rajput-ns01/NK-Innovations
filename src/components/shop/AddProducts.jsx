import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import './Home.css';
import upload from '../../lib/upload'; // Adjust the path as necessary

export const AddProducts = ({ product, onClose, onProductAdded }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState('');

  const types = ['image/png', 'image/jpeg', 'image/webp']; // valid image types

  useEffect(() => {
    if (product) {
      // If product is provided, set the form fields for editing
      setProductName(product.ProductName);
      setProductPrice(product.ProductPrice);
      setProductStock(product.ProductStock);
      setProductImg(null); // Reset the image field
    }
  }, [product]);

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError('');
    } else {
      setProductImg(null);
      setError('Please select a valid image type (jpg, png, or webp)');
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!productImg && !product) {
      setError('Please upload an image');
      return;
    }

    try {
      let imageUrl;
      if (productImg) {
        imageUrl = await upload(productImg); // Upload new image if provided
      } else {
        imageUrl = product.ProductImg; // Use existing image URL if editing
      }

      if (product) {
        // Update the existing product
        await updateDoc(doc(db, 'Products', product.id), {
          ProductName: productName,
          ProductPrice: Number(productPrice),
          ProductStock: Number(productStock),
          ProductImg: imageUrl,
        });
      } else {
        // Add new product
        await addDoc(collection(db, 'Products'), {
          ProductName: productName,
          ProductPrice: Number(productPrice),
          ProductStock: Number(productStock),
          ProductImg: imageUrl,
        });
      }

      // Reset form and clear error
      setProductName('');
      setProductPrice(0);
      setProductStock(0);
      setProductImg(null);
      setError('');
      document.getElementById('file').value = '';

      // Notify parent component to refresh the product list
      onProductAdded();
      onClose(); // Close the form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container5">
      <br />
      <h2>{product ? 'EDIT PRODUCT' : 'ADD PRODUCTS'}</h2>
      <hr />
      <form autoComplete="off" className="form-group" onSubmit={addProduct}>
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <br />
        <label htmlFor="product-price">Product Price</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <br />
        <label htmlFor="product-stock">Stock in Hand</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setProductStock(e.target.value)}
          value={productStock}
        />
        <br />
        <label htmlFor="product-img">Product Image</label>
        <input
          type="file"
          className="form-control"
          id="file"
          onChange={productImgHandler}
        />
        <br />
        <button type="submit" className="btn btn-success btn-md mybtn">
          {product ? 'UPDATE' : 'ADD'}
        </button>
      </form>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};
