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
        }).catch((error)=>{
            toast.error(error)
        }).finally(()=>{
            setIsLoading(false)
        })}

        const onToggle =useCallback(()=>{
                registerModal.onClose()
                loginModal.onOpen()
        },[registerModal,loginModal])

        const bodyContent = (
            <div className="flex flex-col gap-4">
            <Heading
            title="Welcome to Airbnb"
            subtitle="Create an account!"
          />
          <Input  
            id="name"
            label="Name"
          />
          </div>
        )

        const footerContent = (
            <div></div>
        )

  return (
    <Modal
     actionLabel="Continue"
     onSubmit={handleSubmit(onSubmit)}
     disabled={isLoading}
     isOpen={registerModal.isOpen}
     onClose={registerModal.onClose}
     title="Register"
     body={bodyContent}
     footer={footerContent}

    
    />
  )
}

export default RegisterModal