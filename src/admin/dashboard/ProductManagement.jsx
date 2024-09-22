import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { AddProducts } from '../../components/shop/AddProducts';
import UploadForm from '../../components/customProducts/UploadForm';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [rawProducts, setRawProducts] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingRawProduct, setIsAddingRawProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRawProduct, setSelectedRawProduct] = useState(null);

  const fetchProducts = async () => {
    const productCollection = collection(db, 'Products');
    const productSnapshot = await getDocs(productCollection);
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
  };

  const fetchRawProducts = async () => {
    const rawProductCollection = collection(db, 'RawProducts');
    const rawProductSnapshot = await getDocs(rawProductCollection);
    const rawProductList = rawProductSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRawProducts(rawProductList);
  };

  useEffect(() => {
    fetchProducts();
    fetchRawProducts();
  }, []);

  const handleAddProductClick = () => {
    setIsAddingProduct(prev => !prev);
    setSelectedProduct(null);
  };

  const handleAddRawProductClick = () => {
    setIsAddingRawProduct(prev => !prev);
    setSelectedRawProduct(null);
  };

  const handleAddProductClose = () => {
    setIsAddingProduct(false);
  };

  const handleAddRawProductClose = () => {
    setIsAddingRawProduct(false);
  };

  const handleProductAdded = () => {
    fetchProducts();
    fetchRawProducts();
  };

  const handleDelete = async (id, collectionName, imageUrl) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, collectionName, id));

        if (imageUrl) {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        }

        if (collectionName === 'Products') {
          setProducts(products.filter(product => product.id !== id));
        } else {
          setRawProducts(rawProducts.filter(rawProduct => rawProduct.id !== id));
        }

        alert('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product or image:', error);
        alert('Failed to delete the product');
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsAddingProduct(true);
  };

  const handleEditRawProduct = (rawProduct) => {
    setSelectedRawProduct(rawProduct);
    setIsAddingRawProduct(true);
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      <button onClick={handleAddProductClick}>
        {isAddingProduct ? 'Close Add Product' : 'Add Product'}
      </button>

      {isAddingProduct && <AddProducts onClose={handleAddProductClose} onProductAdded={handleProductAdded} product={selectedProduct} />}
      
      <h3>Products</h3>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.id}>
                <td>
                  {product.ProductImg ? (
                    <img src={product.ProductImg} alt={product.ProductName} style={{ width: '50px', height: '50px' }} />
                  ) : 'No Image'}
                </td>
                <td>{product.id}</td>
                <td>{product.ProductName}</td>
                <td>${product.ProductPrice}</td>
                <td>{product.ProductStock}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id, 'Products', product.ProductImg)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products available</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Raw Products</h3>
      <button onClick={handleAddRawProductClick}>
        {isAddingRawProduct ? 'Close Add Raw Product' : 'Add Raw Product'}
      </button>

      {isAddingRawProduct && <UploadForm onClose={handleAddRawProductClose} onProductAdded={handleProductAdded} product={selectedRawProduct} />}

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Material Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rawProducts.length > 0 ? (
            rawProducts.map(rawProduct => (
              <tr key={rawProduct.id}>
                <td>
                  {rawProduct.ProductImg ? (
                    <img src={rawProduct.ProductImg} alt={rawProduct.ProductName} style={{ width: '50px', height: '50px' }} />
                  ) : 'No Image'}
                </td>
                <td>{rawProduct.id}</td>
                <td>{rawProduct.ProductName}</td>
                <td>{rawProduct.category}</td>
                <td>{rawProduct.materialName}</td>
                <td>${rawProduct.ProductPrice}</td>
                <td>{rawProduct.ProductStock}</td>
                <td>
                  <button onClick={() => handleEditRawProduct(rawProduct)}>Edit</button>
                  <button onClick={() => handleDelete(rawProduct.id, 'RawProducts', rawProduct.ProductImg)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No raw products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
