import { create } from 'zustand'


interface LoginModalProps {
    isOpen: boolean,
    onClose: () => void,
    onOpen: () => void
}


const useLoginModal = create<LoginModalProps>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true })
}))

export default useLoginModal