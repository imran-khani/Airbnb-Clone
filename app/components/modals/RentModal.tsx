"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../input/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../input/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../input/Counter";
import ImageUpload from "../input/ImageUpload";
import Input from "../input/Input";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        },
    });

    const category = watch("category");
    const location = watch("location");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");
    const Map = useMemo(() => {
        return dynamic(() => import("@/app/components/Map"), { ssr: false });
    }, [location]);

    const onBack = () => {
        setStep((step) => step - 1);
    };

    const onNext = () => {
        setStep((step) => step + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (step !== STEPS.PRICE) {
            onNext();
            return;
        }
        setIsLoading(true);

        axios
            .post("/api/listings", data)
            .then(() => {
                toast.success("Listing created successfully");
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch(() => {
                toast.error("An error occurred");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create";
        }
        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return null;
        }
        return "Back";
    }, [step]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div
                className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
            >
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) =>
                                setCustomValue("category", category)
                            }
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue("location", value)}
                />
                <Map />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basic info about your place"
                    subtitle="What amenities do you offer?"
                />
                <Counter
                    title="Number of guests"
                    subtitle="How many guests can your place accommodate?"
                    value={guestCount}
                    onChange={(value) => setCustomValue("guestCount", value)}
                />
                <Counter
                    title="Number of rooms"
                    subtitle="How many rooms are available?"
                    value={roomCount}
                    onChange={(value) => setCustomValue("roomCount", value)}
                />
                <Counter
                    title="Number of bathrooms"
                    subtitle="How many bathrooms are available?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue("bathroomCount", value)}
                />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Upload images of your place"
                    subtitle="Show off your place!"
                />
                <ImageUpload
                    onChange={(value) => setCustomValue("imageSrc", value)}
                    value={imageSrc}
                />
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Describe your place"
                    subtitle="What makes your place special?"
                />
                <Input
                    id="title"
                    label="Title"
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Set your price"
                    subtitle="How much do you want to charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                    required
                    type="number"
                    formatPrice
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home"
            body={bodyContent}
        />
    );
};

export default RentModal;