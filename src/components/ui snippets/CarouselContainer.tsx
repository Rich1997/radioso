import React, { ForwardedRef, ReactNode } from "react";
import GridItemSkeleton from "./GridItemSkeleton";

type CarouselContainerProps = {
    isLoading: boolean;
    children: ReactNode;
    containerRef: ForwardedRef<HTMLDivElement>;
};

const CarouselContainer: React.FC<CarouselContainerProps> = ({ isLoading, children, containerRef }) => {
    return (
        <div className="sm:pb-6 pb-2 w-full sm:pt-0 pt-2">
            <div
                ref={containerRef}
                className="flex sm:gap-3 gap-4 overflow-x-auto scrollarea sx pb-4 sm:px-0 px-4 snap-x snap-mandatory"
            >
                {isLoading ? <GridItemSkeleton /> : children}
            </div>
        </div>
    );
};

export default CarouselContainer;
