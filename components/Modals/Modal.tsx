"use client";
import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: ReactElement;
    footer?: ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}
const Modal: FC<ModalProps> = ({
    actionLabel,
    onClose,
    onSubmit,
    body,
    disabled,
    footer,
    isOpen,
    secondaryAction,
    secondaryActionLabel,
    title,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);
    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="flex items-center justify-center fixed inset-0 overflow-x-hidden overflow-y-auto z-50 outline-none bg-neutral-800/70 focus:outline-none">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
                    {/* content */}
                    <div
                        className={`
                    translate
                    duration-300
                    ${showModal ? "translate-y-0" : "translate-y-full"}
                    ${showModal ? "opacity-100" : "opacity-0"}
                    `}
                    >
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* Modal Header */}
                            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                                <button
                                    onClick={handleClose}
                                    className="absolute left-9 p-1 hover:opacity-70 transition"
                                >
                                    <IoMdClose />
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            {/* body */}
                            <div className="relative p-6 flex-auto">{body}</div>
                            {/* footer */}
                            <div className="flex flex-col p-6 gap-2">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryAction &&
                                        secondaryActionLabel && (
                                            <Button
                                                outline
                                                disabled={disabled}
                                                label={secondaryActionLabel}
                                                onClick={handleSecondaryAction}
                                            />
                                        )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
