"use client";

import axios from "axios";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import toast from "react-hot-toast";
import Input from "../Input";
import Heading from "../Heading";
import Modal from "./Modal";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

const RegisterModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/register", data)
            .then(() => {
                toast.success("Registered");
                registerModal.onClose();
                loginModal.onClose();
            })
            .catch((error: any) => {
                toast.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    
    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div
                className="
              text-neutral-500 
              text-center 
              mt-4 
              font-light
            "
            >
                <p>
                    Already have an account?
                    <span
                        onClick={onToggle}
                        className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
                    >
                        {" "}
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
