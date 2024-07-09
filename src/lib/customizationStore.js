// src/store/customizationStore.js
import {create} from 'zustand';

const useCustomizationStore = create((set) => ({
  selectedProduct: '',
  customizationOptions: {
    size: '',
    material: '',
    color: '',
    powerRating: '',
    controlType: '',
  },
  uploadedFiles: [],
  specifications: '',
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setCustomizationOption: (option, value) =>
    set((state) => ({
      customizationOptions: { ...state.customizationOptions, [option]: value },
    })),
  addUploadedFile: (file) =>
    set((state) => ({ uploadedFiles: [...state.uploadedFiles, file] })),
  setSpecifications: (specs) => set({ specifications: specs }),
}));

export default useCustomizationStore;
