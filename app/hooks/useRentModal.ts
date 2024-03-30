import { create } from 'zustand'


interface RentModalProps {
    isOpen: boolean,
    onClose: () => void,
    onOpen: () => void
}


const useRentModal = create<RentModalProps>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true })
}))

export default useRentModal