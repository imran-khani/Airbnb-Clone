'use client'

import Image from "next/image"

const Avatar = () => {
  return (
   <Image
   width={30}
    height={30}
    className=""
    src={'/placeholder.jpg'}
    alt="avatar"
   />
  )
}

export default Avatar