import { SafeListing, SafeUser } from "../types"

interface FavouriteClientProps {
    listing?:SafeListing[],
    currentUser?:SafeUser | null;
}

const FavouriteClient:React.FC<FavouriteClientProps> = ({
    listing,currentUser
}) => {
  return (
    <div>FavouriteClient</div>
  )
}

export default FavouriteClient