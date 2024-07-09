// src/pages/CustomProductPage.jsx
import React from 'react';
import useCustomizationStore from '../../lib/customizationStore';
import RawProductsList from './rawProductsList';
import './raw.css';

const CustomProductPage = () => {
    const {
      selectedProduct,
      customizationOptions,
      uploadedFiles,
      specifications,
      setSelectedProduct,
      setCustomizationOption,
      addUploadedFile,
      setSpecifications,
    } = useCustomizationStore();
  
    const handleFileUpload = (event) => {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        addUploadedFile(files[i]);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Implement submit logic here if needed
    };
  
    return (
      <div className='custom'>
        <h1>Customize Your Robotic Material</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Select Product:
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Select a product</option>
                <option value="motor">Motor</option>
                <option value="sensor">Sensor</option>
                <option value="controller">Controller</option>
              </select>
            </label>
          </div>
  
          <div>
            <h2>Customization Options</h2>
            <label>
              Size:
              <input
                type="text"
                value={customizationOptions.size}
                onChange={(e) => setCustomizationOption('size', e.target.value)}
              />
            </label>
            <label>
              Material:
              <input
                type="text"
                value={customizationOptions.material}
                onChange={(e) =>
                  setCustomizationOption('material', e.target.value)
                }
              />
            </label>
            <label>
              Color:
              <input
                type="text"
                value={customizationOptions.color}
                onChange={(e) => setCustomizationOption('color', e.target.value)}
              />
            </label>
            <label>
              Power Rating:
              <input
                type="text"
                value={customizationOptions.powerRating}
                onChange={(e) =>
                  setCustomizationOption('powerRating', e.target.value)
                }
              />
            </label>
            <label>
              Control Type:
              <input
                type="text"
                value={customizationOptions.controlType}
                onChange={(e) =>
                  setCustomizationOption('controlType', e.target.value)
                }
              />
            </label>
          </div>
  
          <div>
            <h2>Upload Files</h2>
            <input type="file" multiple onChange={handleFileUpload} />
            <div>
              {uploadedFiles.length > 0 && (
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
  
          <div>
            <h2>Specifications</h2>
            <textarea
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              placeholder="Enter specific details or requirements here..."
            />
          </div>
  
          <button type="submit">Submit</button>
        </form>
  
        <RawProductsList />
      </div>
    );
  };
  
  export default CustomProductPage;