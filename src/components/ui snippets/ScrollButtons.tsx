import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

interface ScrollButtonsProps {
    containerRef: React.RefObject<HTMLDivElement>;
    contentLength: number; // New prop to track content changes
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

        // Check scroll on mount and when content changes
        checkScroll();

        return () => {
            container.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, [containerRef, checkScroll]);

    // Re-check scroll when contentLength changes
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
                variant="ghost"
                onClick={() => scroll("left")}
                className={`${!canScrollLeft ? "text-muted-foreground" : ""}`}
                disabled={!canScrollLeft}
            >
                <ChevronLeftCircle />
            </Button>
            <Button
                id="buttonRight"
                size="oo"
                variant="ghost"
                onClick={() => scroll("right")}
                className={`${!canScrollRight ? "text-muted-foreground" : ""}`}
                disabled={!canScrollRight}
            >
                <ChevronRightCircle />
            </Button>
        </div>
    );
};

export default ScrollButtons;
