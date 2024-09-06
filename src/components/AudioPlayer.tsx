import React, { useRef, useEffect, useState } from "react";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";

type AudioPlayerProps = {
    audioUrl: string;
    thumb?: string;
    isPlaying: boolean;
    onPlayPause: () => void;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, thumb, isPlaying, onPlayPause }) => {
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
        <div className="h-full w-full bg-muted">
            <audio ref={audioRef} />
            <div className="flex items-center justify-between h-full">
                <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
                <div className="flex items-center gap-2">
                    <button onClick={toggleMute}>
                        {isMuted ? <HiVolumeOff size={24} /> : <HiVolumeUp size={24} />}
                    </button>
                    {thumb && (
                        <img
                            className="min-w-[68px] w-[68px] min-h-[68px] h-[68px]"
                            src={thumb}
                            alt="Station thumbnail"
                        />
                    )}
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
