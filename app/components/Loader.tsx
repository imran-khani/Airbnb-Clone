'use client'
import MoonLoader from 'react-spinners/MoonLoader'

const Loader = () => {
  return (
  <div className="flex min-h-screen items-center justify-center">
      <MoonLoader color="#36d7b7" />
  </div>
  )
}

export default Loader