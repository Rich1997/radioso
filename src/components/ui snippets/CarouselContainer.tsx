import React, { ForwardedRef, ReactNode } from "react";
import GridItemSkeleton from "./GridItemSkeleton";
import { isMobileUserAgent } from "@/lib/utils";

type CarouselContainerProps = {
    isLoading: boolean;
    children: ReactNode;
    containerRef: ForwardedRef<HTMLDivElement>;
};

const CarouselContainer: React.FC<CarouselContainerProps> = ({ isLoading, children, containerRef }) => {
    const isMobile = isMobileUserAgent();

    return (
        <div className="w-full pt-0 sm:pb-14 pb-6">
            <div
                ref={containerRef}
                className={`flex sm:gap-4 gap-0 overflow-x-auto pb-4 sm:px-0 px-2 snap-x snap-mandatory scrollarea ${
                    isMobile ? "mobile" : ""
                }`}
            >
                {isLoading ? <GridItemSkeleton /> : children}
            </div>
        </div>
    );
};

export default CarouselContainer;
