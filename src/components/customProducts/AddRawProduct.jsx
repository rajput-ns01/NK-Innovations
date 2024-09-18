import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import upload from '../../lib/upload'; // Function to upload image to Firebase Storage

export const AddRawProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState('');

  const validTypes = ['image/png', 'image/jpeg', 'image/webp']; // valid image types

  const productImgHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError('');
    } else {
      setProductImg(null);
      setError('Please select a valid image type (jpg, png, or webp)');
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!productImg) {
      setError('Please upload an image');
      return;
    }

    try {
      const imageUrl = await upload(productImg); // Upload image and get URL

      await addDoc(collection(db, 'rawProducts'), {
        productName,
        productPrice: Number(productPrice),
        companyName,
        imageURL: imageUrl,
        // Add any other fields you might need
      });

      // Reset form and clear error
      setProductName('');
      setProductPrice('');
      setCompanyName('');
      setProductImg(null);
      setError('');
      document.getElementById('file').value = '';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Add Raw Product</h2>
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
        <label htmlFor="company-name">Company Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName}
        />
        <br />
        <label htmlFor="product-img">Product Image</label>
        <input
          type="file"
          className="form-control"
          id="file"
          required
          onChange={productImgHandler}
        />
        <br />
        <button type="submit" className="btn btn-success">
          Add Product
        </button>
      </form>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};
