"use client";

import { Range } from "react-date-range";
import Calendar from "../input/Calendar";
import Button from "../Button";

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    dateRange: Range;
    onSubmit: () => void;
    disabledDates: Date[];
    disabled?: boolean;
    onDateChange: (dateRange: Range) => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    dateRange,
    disabledDates,
    onDateChange,
    onSubmit,
    disabled,
}) => {
    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">$ {price}</div>
                <div className="text-neutral-500">per night</div>
            </div>
            <hr />
            <Calendar 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={ value => onDateChange(value.selection)}
            />
            <Button
            label="Reserve"
            onClick={onSubmit}
            disabled={disabled}
            />
            <hr />
            <div className="flex flex-row items-center justify-between p-4">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-lg font-semibold">${totalPrice}</div>
            </div>
        </div>
    );
};

export default ListingReservation;
