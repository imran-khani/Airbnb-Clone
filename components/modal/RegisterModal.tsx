'use client'
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback,useState } from "react"
import toast from "react-hot-toast"
import { FieldValues,SubmitHandler,useForm } from "react-hook-form"
import { Modal,Input,Heading,Button } from ".."
import useRegisterModal from "@/hooks/useResgisterModal"
import useLoginModal from "@/hooks/useLoginModal"


const RegisterModal = () => {

 const [isLoading,setIsLoading] = useState<boolean>(false)
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
const {register,handleSubmit,formState:{errors}} = useForm({
    defaultValues:{
        name:'',
        email:'',
        password:'',
    }
})

const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)

        axios.post('/api/register',data)
        .then(()=>{
            toast.success('Registerd!')
            registerModal.onClose();
            loginModal.onOpen();
        })
}

  return (
    <div>

    </div>
  )
}

export default RegisterModal