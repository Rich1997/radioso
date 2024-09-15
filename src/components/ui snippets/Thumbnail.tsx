import { handleImageError } from "@/lib/utils";

type ThumbnailProps = {
    size: string;
    imgSrc: string | undefined;
    stationName: string;
};

const Thumbnail: React.FC<ThumbnailProps> = ({ size, imgSrc, stationName }) => {
    return (
        <div
            className="relative bg-border rounded-lg flex items-center overflow-hidden"
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
                }}
                src={imgSrc}
                alt="Station thumbnail"
                onError={(event) => {
                    const target = event.target as HTMLImageElement;
                    target.src = handleImageError(stationName);
                }}
            />
        </div>
    );
};

export default Thumbnail;
