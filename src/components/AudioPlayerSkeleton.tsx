import { FaPlay } from "react-icons/fa6";

const AudioPlayerSkeleton = () => {
    return (
        <div className="flex w-full h-full select-none items-center p-4 gap-4">
            <div className="flex items-center justify-center">
                <div className="rounded-full sm:h-10 sm:w-10 h-12 w-12 bg-background/70 flex items-center justify-center text-muted">
                    <div className="pl-0.5">
                        <FaPlay size={18} />
                    </div>
                </div>
            </div>
            <div className="flex items-center sm:gap-4 gap-2">
                <div className="sm:h-[72px] h-16 sm:w-[72px] w-16 min-h-16 min-w-16 bg-background/70 rounded-lg" />
                <div className="text-muted-foreground">No station currently playing</div>
            </div>
        </div>
    );
};

export default AudioPlayerSkeleton;
