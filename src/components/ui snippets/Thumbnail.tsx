type ThumbnailProps = {
    size: string;
    imgSrc: string | undefined;
};

const Thumbnail: React.FC<ThumbnailProps> = ({ size, imgSrc }) => {
    return (
        // Small screen size on default size prop, sizeOverride prop for larger screens
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
                // onError={(event) => {
                //     const target = event.target as HTMLImageElement;
                //     target.src = handleImageError(stationName);
                // }}
            />
        </div>
    );
};

export default Thumbnail;
