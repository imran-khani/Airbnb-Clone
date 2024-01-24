"use client";
import { FC, useCallback, useEffect, useState } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    disabled?: boolean;
    secondaryAction: () => void;
    secondaryLabel?: string;
}

const Modal: FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return;
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;
        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;
        secondaryAction();
    }, [secondaryAction, disabled]);
    if (!isOpen) return null;

    return (
        <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/30">
                <div
                 className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto"
                 >
                    {/* content */}
                    <div
                    className=""
                    ></div>

                </div>
            </div>
        </>
    );
};

export default Modal;
