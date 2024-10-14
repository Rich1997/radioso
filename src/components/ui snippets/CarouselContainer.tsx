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
        <div className="w-full sm:pt-0 pt-2 sm:pb-14 pb-6">
            <div
                ref={containerRef}
                className="flex sm:gap-3 gap-4 overflow-x-auto pb-4 sm:px-0 px-4 snap-x snap-mandatory"
                style={{
                    scrollbarColor: isMobile ? "transparent transparent" : "var(--scrollbar-thumb) transparent",
                }}
            >
                {isLoading ? <GridItemSkeleton /> : children}
            </div>
        </div>
    );
};

export default CarouselContainer;
