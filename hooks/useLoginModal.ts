import { create } from "zustand";

interface loginModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useLoginModal = create<loginModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal
