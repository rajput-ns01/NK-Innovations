// components/UploadForm.jsx
import React, { useState, useEffect } from 'react';
import upload from '../../lib/upload';
import { db } from '../../lib/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import './CustomizationPage.css';

const UploadForm = ({ product, onClose, onProductAdded }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      // Pre-fill form fields with existing product data if editing
      setName(product.ProductName);
      setCategory(product.category);
      setMaterialName(product.materialName);
      setPrice(product.ProductPrice);
      setStock(product.ProductStock);
      setFile(null); // Reset file for image upload
    }
  }, [product]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let uploadedImageUrl = '';

      // Upload image and get URL if a new file is provided
      if (file) {
        uploadedImageUrl = await upload(file); // Wait for the image URL
      }

      const productRef = product
        ? doc(db, 'RawProducts', product.id) // Reference to existing product for update
        : collection(db, 'RawProducts'); // Reference to collection for new product

      if (product) {
        // Update the existing product
        await updateDoc(productRef, {
          ProductName: name,
          category,
          ProductPrice: Number(price),
          materialName,
          ProductStock: Number(stock),
          ProductImg: uploadedImageUrl || product.ProductImg, // Use existing image if no new upload
        });
      } else {
        // Add new product
        await addDoc(productRef, {
          ProductName: name,
          category,
          ProductPrice: Number(price),
          materialName,
          ProductStock: Number(stock),
          ProductImg: uploadedImageUrl, // Use the uploaded image URL
        });
      }

      alert('Product added/updated successfully');

      // Reset form fields
      setName('');
      setCategory('');
      setPrice('');
      setMaterialName('');
      setStock('');
      setFile(null);

      // Notify parent component to refresh the product list
      onProductAdded();
      onClose(); // Close the form
    } catch (error) {
      console.error('Error adding/updating product:', error);
      alert('Error adding/updating product');
    }

    setUploading(false);
  };

  return (
    <div className="container5">
      <h1>{product ? 'Edit Product' : 'Add a New Product'}</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <label className='new-label'>
          Product Name:
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className='new-label'>
          Category:
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <label className='new-label'>
          Material Name:
          <input
            type="text"
            className="form-control"
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
            required
          />
        </label>
        <label className='new-label'>
          Price:
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label className='new-label'>
          Stock:
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </label>
        <label className='new-label'>
          Image:
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit" className="btn btn-success btn-md mybtn" disabled={uploading}>
          {uploading ? 'Uploading...' : (product ? 'Update Product' : 'Add Product')}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
