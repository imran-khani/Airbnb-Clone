import { create } from 'zustand'


interface RegisterModalProps {
    isOpen: boolean,
    onClose: () => void,
    onOpen: () => void
}

const useRegisterModal = create<RegisterModalProps>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true })
}))

export default useRegisterModal