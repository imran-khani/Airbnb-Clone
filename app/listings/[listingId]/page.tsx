
import getListingById from "@/app/actions/getListingById"

interface Params {
    listingId?:string;
}
const page = async(params:Params) => {
    const listing = await getListingById(params)
  return (
    <div>
        {listing?.title}
    </div>
  )
}

export default page