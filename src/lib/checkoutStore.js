import { create } from 'zustand';

const useCheckoutStore = create((set) => ({
  specification: '',
  setSpecification: (spec) => set({ specification: spec }),
}));

export default useCheckoutStore;
