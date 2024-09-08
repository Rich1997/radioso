import React, { useRef, useEffect, useState } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import Thumbnail from "./ui snippets/Thumbnail";

type AudioPlayerProps = {
    audioUrl: string;
    thumb?: string;
    isPlaying: boolean;
    onPlayPause: () => void;
    stationName: string;
    stationCountry: string;
    stationState: string;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
    audioUrl,
    thumb,
    isPlaying,
    onPlayPause,
    stationName,
    stationCountry,
    stationState,
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [audioUrl]);

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
            audioRef.current.muted = newVolume === 0;
        }
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="h-full w-full bg-card">
            <audio ref={audioRef} />
            <div className="flex items-center justify-between h-full gap-4">
                <div className="flex gap-4">
                    <button onClick={onPlayPause}>
                        {isPlaying ? (
                            <FaCirclePause size={36} className="text-primary" />
                        ) : (
                            <FaCirclePlay size={36} className="text-primary" />
                        )}
                    </button>
                    <div className="flex gap-2 items-center">
                        <Thumbnail size="68" imgSrc={thumb} />
                        <div>
                            <div className="font-bold text-ellipsis line-clamp-1 break-all">{stationName}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                                {stationCountry}
                                {stationCountry && stationState ? ", " : ""}
                                {stationState ?? stationState}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:flex hidden items-center gap-2">
                    <button onClick={toggleMute}>
                        {isMuted ? <HiVolumeOff size={24} /> : <HiVolumeUp size={24} />}
                    </button>

                    <input
                        className="slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        style={{ "--value": `${(isMuted ? 0 : volume) * 100 - 1}%` } as React.CSSProperties}
                    />
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
