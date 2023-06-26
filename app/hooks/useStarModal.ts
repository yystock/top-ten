import { create } from "zustand";

interface StarModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useStarModal = create<StarModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useStarModal;
