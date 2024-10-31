import { memo } from "react";
import { Loader2 } from "lucide-react";
import PauseCircleIcon from "../assets/icons/PauseCircleIcon";
import PlayCircleIcon from "../assets/icons/PlayCircleIcon";
import { cn } from "@/lib/utils";

interface PlayPauseButtonProps {
    size: number;
    isLoading: boolean;
    isPlaying: boolean;
    onPlayPause: (e: React.MouseEvent) => void;
    className?: string;
}

const PlayPauseButton = memo(({ size, isLoading, isPlaying, onPlayPause, className }: PlayPauseButtonProps) => {
    if (isLoading) {
        return (
            <div className="animate-spin">
                <Loader2 size={size} className={cn("text-primary", className)} />
            </div>
        );
    }

    return (
        <button
            onClick={onPlayPause}
            aria-label={isPlaying ? "pause" : "play"}
            className={cn("text-primary", className)}
        >
            {isPlaying ? <PauseCircleIcon size={size} /> : <PlayCircleIcon size={size} />}
        </button>
    );
});

PlayPauseButton.displayName = "PlayPauseButton";

export default PlayPauseButton;
