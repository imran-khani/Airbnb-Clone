'use client'

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useState,useCallback } from "react"
import {
    FieldValues,
    SubmitHandler,
    useForm
}
from "react-hook-form"
import useRegisterModal from "@/hooks/useRegisterModal"
import Modal from "./Modal"

const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false)
    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:"",
            email:"",
            password:"",
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);
        axios.post('/api/register',data)
        .then(()=>{
            RegisterModal.onClose();
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }
  return (
   <Modal 
   disabled={isLoading}
   isOpen={RegisterModal.isOpen}
    onClose={RegisterModal.onClose}
    title="Register"
    actionLabel="Continue"
    onSubmit={handleSubmit(onSubmit)}
   />
  )
}

export default RegisterModal