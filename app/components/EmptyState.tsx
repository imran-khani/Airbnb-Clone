"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No data found",
    subtitle = "Try again with a different filter",
    showReset = false,
}) => {
    const router = useRouter();
    return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
            <Heading center title={title} subtitle={subtitle} />
            <div className="w-48 mt-4">
                <Button
                    label="Remove all filters"
                    onClick={() => router.push("/")}
                />
            </div>
        </div>
    );
};

export default EmptyState;
