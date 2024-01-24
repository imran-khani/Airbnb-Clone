"use client";

import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldError;
}
const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    required,
    register,
    errors,
}) => {
    return(
        <div className="w-full relative">
        {
            formatPrice && (
                <BiDollar
                size={24}
                className="text-neutral-700 absolute top-5 left-2"
                />
            )
        }
        <input
        id={id}
        disabled={disabled}
        {...register(id,{required})}
        placeholder=" "
        type={type}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${formatPrice?'pl-9':'pl-4'} 
        ${errors[id as keyof FieldError]?'border-rose-500':'border-neutral-300'}
        ${errors[id as keyof FieldError]?'focus:border-rose-500':'focus:border-black'}
        
        `}
        />
        </div>
    )
};

export default Input;
