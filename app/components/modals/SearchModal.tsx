"use client";

import Modal from "./Modal";
import qs from "query-string";

import { useRouter, useSearchParams } from "next/navigation";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../input/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../input/Calendar";
import Counter from "../input/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const router = useRouter();

    const searchModal = useSearchModal();
    const searchParams = useSearchParams();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [roomCount, setRoomCount] = useState(1);
    const [guestCount, setGuestCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const Map = useMemo(
        () => dynamic(() => import("../Map"), { ssr: false }),
        [location]
    );

    const onBack = useCallback(() => {
        setStep((prev) => prev - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((prev) => prev + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }
        let currentQuery = {};

        if (searchParams) {
            currentQuery = qs.parse(searchParams.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            location: location?.value || "India",
            roomCount,
            guestCount,
            bathroomCount,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );

        setStep(STEPS.LOCATION);

        searchModal.onClose();
        router.push(url);
    }, [
        step,
        location,
        roomCount,
        guestCount,
        bathroomCount,
        dateRange,
        searchParams,
        onNext,
        router,
        searchModal,
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return "Search";
        }
        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you wanna go?"
                subtitle="Select a location"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );
    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you wanna go?"
                    subtitle="Select a date range"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                    key={dateRange.key}
                />
            </div>
        );
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More Informations."
                    subtitle="Find your perfect place."
                />
                <Counter
                    title="Guests"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                    subtitle="How many guests?"
                />
                <Counter
                    title="Rooms"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                    subtitle="How many rooms?"
                />
                <Counter
                    title="Bathrooms"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                    subtitle="How many bathrooms?"
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            body={bodyContent}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step !== STEPS.LOCATION ? onBack : undefined}
        />
    );
};

export default SearchModal;
//  08:14:32