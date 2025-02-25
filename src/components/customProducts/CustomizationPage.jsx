import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { productData } from '../../lib/data';
import './CustomizationPage.css';
import { CartContext } from '../shop/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Updated import
import NavBar from '../shop/NavBar';
import useCheckoutStore from '../../lib/checkoutStore';

const CustomizationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState(new Set()); // To store selected materials
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true); // To manage checkout button state
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate(); // Updated hook
  const { setSpecification, specification } = useCheckoutStore();

  // Add to cart function
  const addToCart = (product) => {
    if (selectedMaterial) {
      dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product });
      setSelectedMaterials(prev => new Set([...prev, selectedMaterial]));
      toast.success('Product added to cart', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } else {
      toast.error('Please select a material before adding to cart', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  // Check if all materials are selected
  const areAllMaterialsSelected = () => {
    if (!selectedProduct) return false;

    const productMaterials = productData[selectedCategory].find(p => p.name === selectedProduct)?.materials || [];
    return productMaterials.every(material => selectedMaterials.has(material));
  };



  // Update checkout button state based on material selection
  useEffect(() => {
    setIsCheckoutDisabled(!areAllMaterialsSelected());
  }, [selectedMaterials, selectedCategory, selectedProduct]);

  // Fetching products based on selection
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productRef = collection(db, 'RawProducts');
        let q;

        // Apply filters based on selected options
        if (selectedCategory && selectedProduct && selectedMaterial) {
          q = query(
            productRef,
            where('category', '==', selectedCategory),
            where('ProductName', '==', selectedProduct),
            where('materialName', '==', selectedMaterial)
          );
        } else if (selectedCategory && selectedProduct) {
          q = query(
            productRef,
            where('category', '==', selectedCategory),
            where('ProductName', '==', selectedProduct)
          );
        } else if (selectedCategory) {
          q = query(
            productRef,
            where('category', '==', selectedCategory)
          );
        } else {
          q = query(productRef); // Default query to get all products if no filters are applied
        }

        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({
          ProductID: doc.id,
          ...doc.data()
        }));

        setFilteredProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, selectedProduct, selectedMaterial]);

  return (
    <>
      <NavBar />
      <div className="customization-page">
        <h1>Customize Your Product</h1>

        {/* Category Selection */}
        <div className="category-selection">
          <label>Category:</label>
          <select className='select' value={selectedCategory} onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedProduct(''); 
            setSelectedMaterial(''); 
            setSelectedMaterials(new Set()); 
          }}>
            <option value="">--Select--</option>
            {Object.keys(productData).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Product Selection */}
        {selectedCategory && (
          <div className="product-selection">
            <label>Product:</label>
            <select className='select' value={selectedProduct} onChange={(e) => {
              setSelectedProduct(e.target.value);
              setSelectedMaterial('');
              setSelectedMaterials(new Set()); 
            }}>
              <option value="">--Select--</option>
              {productData[selectedCategory].map((product) => (
                <option key={product.name} value={product.name}>{product.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Material Selection */}
        {selectedProduct && (
          <div className="material-selection">
            <label>Material:</label>
            <select className='select' value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
              <option value="">--Select--</option>
              {productData[selectedCategory]
                .find((product) => product.name === selectedProduct)
                .materials.map((material) => (
                  <option key={material} value={material}>{material}</option>
                ))}
            </select>
          </div>
        )}
        

        {/* Message to select all materials */}
        {!selectedMaterial && selectedProduct && (
          <div className="message-container">
            <p>Please select all available materials for the chosen product to proceed with customization.</p>
          </div>
        )}
  <textarea
          className='specification'
          value={specification}
          onChange={(e) => setSpecification(e.target.value)} // Store in Zustand
          placeholder='Enter your specification'
        ></textarea>

        <button
          className='btn checkout-btn'
          disabled={isCheckoutDisabled}
          onClick={() => {
            setSpecification(specification); // Save specification in global state
            toast.success('Specification saved!');
          }}
        >
          Add
        </button>


{/* Display Filtered Products */}
        {filteredProducts.length > 0 && (
          <div className="filtered-products">
            <h2>Product Details</h2>
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <div key={index} className="product-card">
                  <img src={product.ProductImg} alt={product.ProductName} />
                  <h3>{product.ProductName}</h3>
                  <p><strong>Price:</strong> {product.ProductPrice}</p>
                  <p><strong>Stock:</strong> {product.ProductStock}</p>
                  <button className='btn' onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Products Message */}
        {filteredProducts.length === 0 && !loading && (
          <p>No products found for the selected category or product.</p>
        )}

      </div>
    </>
  );
};

export default CustomizationPage;
