"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any;
}

interface ImageProps {
    onChange: (value: string) => void;
    value: string;
}
const ImageUpload: React.FC<ImageProps> = ({ onChange, value }) => {
    const handleUpload = useCallback(
        (result: any) => {
            onChange(result.info.secure_url);
        },
        [onChange]
    );
    return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="bqrqs9cm"
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="
                    relative
                    cursor-pointer
                    hover:opacity-70
                    transition
                    border-2
                    border-dashed
                    p-20
                    border-neutral-300
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-4
                    text-neutral-600
                    "
                    >
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Click to Upload
                        </div>
                        {value && (
                            <div className="relative w-40 h-40">
                                <Image
                                    src={value}
                                    layout="fill"
                                    style={{ objectFit: "cover" }}
                                    alt="Image"
                                />
                            </div>
                        )}
                    </div>
                );
            }}
        </CldUploadWidget>
    );
};

export default ImageUpload;
