import { SafeReservation, SafeUser } from "../types"

interface TripsClientProps {
    reservations: SafeReservation[]
    currentUser?:SafeUser | null
}

const TripsClient:React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
  return (
    <div>TripsClient</div>
  )
}

export default TripsClient