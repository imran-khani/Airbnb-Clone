import React from "react";

interface Props {
    title: string;
    subtitle?: string;
    center?: boolean;
}
const Heading: React.FC<Props> = ({ title, subtitle, center }) => {
    return (
        <div className={`${center ? "text-center" : "text-start"}`}>
            <div className="text-2xl font-bold">{title}</div>
            <div className="font-light text-neutral-500mt-2">{subtitle}</div>
        </div>
    );
};

export default Heading;
