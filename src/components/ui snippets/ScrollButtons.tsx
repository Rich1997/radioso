import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollButtonsProps {
    containerRef: React.RefObject<HTMLDivElement>;
    contentLength: number;
}

const ScrollButtons: React.FC<ScrollButtonsProps> = ({ containerRef, contentLength }) => {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }, [containerRef]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        checkScroll();

        return () => {
            container.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, [containerRef, checkScroll]);

    useEffect(() => {
        checkScroll();
    }, [contentLength, checkScroll]);

    const scroll = (direction: "left" | "right") => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollBy({
            left: direction === "left" ? -container.clientWidth : container.clientWidth,
            behavior: "smooth",
        });
    };

    return (
        <div className="pb-4 sm:flex hidden gap-3">
            <Button
                id="buttonLeft"
                size="oo"
                variant="outline"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="h-8 w-8 rounded-full"
            >
                <ChevronLeft size={16} />
            </Button>
            <Button
                id="buttonRight"
                size="oo"
                variant="outline"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="h-8 w-8 rounded-full"
            >
                <ChevronRight size={16} />
            </Button>
        </div>
    );
};

export default ScrollButtons;
