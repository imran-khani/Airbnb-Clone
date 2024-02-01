'use client'
import { FC } from "react";
import { IconType } from "react-icons";

interface BtnProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}
const Button: FC<BtnProps> = ({
    label,
    onClick,
    disabled,
    icon: Icon,
    outline,
    small,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
    ${outline ? "bg-white" : "bg-rose-500"}
    ${outline ? "border-black" : "bg-rose-500"}
    ${outline ? "text-black" : "text-white"}
    ${small ? "py-1" : "py-2"}
    ${small ? "text-sm" : "text-lg"}
    ${small ? "font-light" : "font-semibold"}
    ${small ? "border-[1px]" : "border-2"}
    `}
        >
            {Icon && <Icon size={24} className="absolute left-4 top-3" />}
            {label}
        </button>
    );
};

export default Button;
