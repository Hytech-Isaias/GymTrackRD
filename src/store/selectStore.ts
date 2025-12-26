import { create } from 'zustand';

interface SelectState {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export const useSelectStore = create<SelectState>((set) => ({
  selectedValue: '',
  setSelectedValue: (value) => set({ selectedValue: value }),
}));
