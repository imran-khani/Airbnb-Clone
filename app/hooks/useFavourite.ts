import axios from "axios";
import { useCallback, memo, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { BiToggleLeft } from "react-icons/bi";

interface Favourite {
    listingId: string;
    currentUser?: SafeUser | null;
}


const useFavourite = ({ listingId, currentUser }: Favourite) => {

    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFavourited = useMemo(() => {
        const list = currentUser?.favouriteIds || [];

        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavourite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            loginModal.onOpen()
            return
        }
        try {

            let request;
            if (hasFavourited) {
                request = () => axios.delete(`/api/favourites/${listingId}`)
                toast.success('Removed from favourites')
            }
            else {
                request = () => axios.post(`api/favourites/${listingId}`)
                toast.success('Added to favourites')
            }

            await request()
            router.refresh()
        } catch (error: any) {
            toast.error('someting went wrong!')
        }

    }, [currentUser, hasFavourited, listingId, loginModal, router])

    return { hasFavourited, toggleFavourite }
}



export default useFavourite