const AudioPlayerSkeleton = () => {
    return (
        <div className="flex w-full h-full select-none items-center p-4 sm:gap-4 gap-0">
            <div className="flex items-center justify-center">
                <div className="rounded-full h-10 w-10 bg-background/70 items-center justify-center text-muted sm:block hidden" />
            </div>
            <div className="flex items-center gap-4 w-full">
                <div className="h-[72px] w-[72px] bg-background/70 rounded-lg sm:block hidden" />
                <div className="text-muted-foreground sm:mx-0 mx-auto">No station currently playing</div>
            </div>
        </div>
    );
};

export default AudioPlayerSkeleton;
