// components/UploadForm.jsx
import React, { useState } from 'react';
import upload from '../../lib/upload';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import './CustomizationPage.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageURL, setImageURL] = useState('');
  const[materialName,setMaterialName]=useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
  
    try {
      let uploadedImageUrl = '';
  
      // Upload image and get URL
      if (file) {
        uploadedImageUrl = await upload(file); // Wait for the image URL
      }
  
      // Add product data to Firestore
      const productRef = collection(db, 'RawProducts');
      await addDoc(productRef, {
        ProductName:name,
        category,
        ProductPrice:Number(price),
        materialName,
        ProductStock: Number(stock),
        ProductImg: uploadedImageUrl, // Use the uploaded image URL
      });
  
      alert('Product added successfully');
  
      // Reset form fields
      setName('');
      setCategory('');
      setPrice('');
      setMaterialName('');
      setStock('');
      setImageURL('');
      setFile(null);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  
    setUploading(false);
  };
  
  return (
    <div className="upload-form">
      <h1>Add a New Product</h1>
      <form onSubmit={handleSubmit}>
        <label className='new-label'>
          Product Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className='new-label'>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <label className='new-label'>
          Material Name:
          <input
            type="text"
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
            required
          />
        </label>
        <label className='new-label'>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label className='new-label'>
          Stock:
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </label>
        <label className='new-label'>
          Image:
          <input
            type="file"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
