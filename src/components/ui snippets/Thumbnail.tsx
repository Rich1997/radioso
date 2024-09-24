import React, { useState } from "react";
import { handleImageError } from "@/lib/utils";

type ThumbnailProps = {
    size: string;
    imgSrc: string | undefined;
    stationName: string;
};

const Thumbnail: React.FC<ThumbnailProps> = ({ size, imgSrc, stationName }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [useFallback, setUseFallback] = useState(false);

    const handleLoad = () => {
        setImageLoaded(true);
    };

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = event.target as HTMLImageElement;
        target.src = handleImageError(stationName);
        setUseFallback(true);
        setImageLoaded(false);
    };

    return (
        <div
            className="relative bg-muted rounded-lg flex items-center justify-center overflow-hidden"
            style={{
                minWidth: `${size}px`,
                width: `${size}px`,
                minHeight: `${size}px`,
                height: `${size}px`,
            }}
        >
            <img
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    objectFit: "cover",
                    opacity: imageLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                }}
                src={useFallback ? handleImageError(stationName) : imgSrc}
                alt="Station thumbnail"
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
};

export default Thumbnail;
