// src/components/RawProductsList.jsx
import React from 'react';
import useCustomizationStore from '../../lib/customizationStore';
import rawProducts from '../../lib/rawProducts';



const RawProductsList = () => {
  const { customizationOptions } = useCustomizationStore();

  const filteredProducts = rawProducts.filter((product) => {
    const {
      size,
      material,
      color,
      powerRating,
      controlType,
    } = customizationOptions;
    return (
      (size ? product.size === size : true) &&
      (material ? product.material === material : true) &&
      (color ? product.color === color : true) &&
      (powerRating ? product.powerRating === powerRating : true) &&
      (controlType ? product.controlType === controlType : true)
    );
  });

  return (
    <div>
      <h2>Matching Raw Products</h2>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p><strong>Size:</strong> {product.size}</p>
              <p><strong>Material:</strong> {product.material}</p>
              <p><strong>Color:</strong> {product.color}</p>
              <p><strong>Power Rating:</strong> {product.powerRating}</p>
              <p><strong>Control Type:</strong> {product.controlType}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-products-msg">No matching products found.</p>
      )}
    </div>
  );
};

export default RawProductsList;