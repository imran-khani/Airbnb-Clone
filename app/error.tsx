'use client'

import { useEffect, useState } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorPageProps {
    error:Error
}
const ErrorPage:React.FC<ErrorPageProps> = ({
    error
}) => {

    useEffect(()=>{
        console.error(error)
    },[])

  return (
    <EmptyState
    title="Error"
    subtitle="An error occurred. Please try again later."
    />
  )
}

export default ErrorPage