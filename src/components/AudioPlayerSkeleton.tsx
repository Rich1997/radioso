const AudioPlayerSkeleton = () => {
    return (
        <div className="flex w-full h-full select-none items-center sm:px-6 px-4 p-4 gap-4 sm:justify-between justify-start">
            <div className="flex items-center justify-center">
                <div className="rounded-full sm:h-10 sm:w-10 h-12 w-12 bg-input items-center justify-center text-muted" />
            </div>
            <div className="flex items-center sm:gap-4 gap-3">
                <div className="sm:h-[64px] sm:w-[64px] h-14 w-14 bg-input rounded-lg" />
                <div className="text-muted-foreground sm:mx-0 mx-auto sm:text-base text-sm">
                    No station currently playing
                </div>
            </div>
            <div className="h-6 w-[114px] bg-input rounded-lg sm:block hidden" />
        </div>
    );
};

export default AudioPlayerSkeleton;
