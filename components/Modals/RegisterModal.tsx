"use client";

import axios from "axios";
import useRegisterModal from "../hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";

const RegisterModal = () => {
    const [isLoading, setIsLoading] = useState(false);

    const registerModal = useRegisterModal();
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
                registerModal.onClose();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    };

    const bodyContent = (
        <>
            <div className="flex flex-col gap-4">
                <Heading
                    title="Welcome to Airbnb"
                    subtitle="Create an Account"
                />
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    required
                    register={register}
                    errors={errors}
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
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        </>
    );

    return (
        <>
            <Modal
                disabled={isLoading}
                isOpen={registerModal.isOpen}
                title="Register"
                actionLabel="Continue"
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
            />
        </>
    );
};

export default RegisterModal;
