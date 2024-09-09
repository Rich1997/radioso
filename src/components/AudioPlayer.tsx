import React, { useRef, useEffect, useState } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import Thumbnail from "./ui snippets/Thumbnail";

type AudioPlayerProps = {
    audioUrl: string;
    thumb?: string;
    isPlaying: boolean;
    onPlayPause: () => void;
    stationName: string;
    stationCountry: string;
    stationState: string;
    tags?: string;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
    audioUrl,
    thumb,
    isPlaying,
    onPlayPause,
    stationName,
    stationCountry,
    stationState,
    tags,
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isDrawerOpen]);

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

    const toggleDrawer = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest(".controls-area")) {
            return;
        }
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="relative h-full w-full bg-card">
            <audio ref={audioRef} />
            <div className="flex items-center justify-between h-full gap-4 cursor-pointer" onClick={toggleDrawer}>
                <div className="flex gap-4 items-center">
                    <div className="h-9">
                        <button
                            className="controls-area"
                            onClick={(e) => {
                                e.stopPropagation();
                                onPlayPause();
                            }}
                        >
                            {isPlaying ? (
                                <FaCirclePause size={36} className="text-primary" />
                            ) : (
                                <FaCirclePlay size={36} className="text-primary" />
                            )}
                        </button>
                    </div>
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
                <div className="sm:flex hidden items-center gap-2 controls-area">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                        }}
                    >
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
                        onClick={(e) => e.stopPropagation()}
                        style={{ "--value": `${(isMuted ? 0 : volume) * 100 - 1}%` } as React.CSSProperties}
                    />
                </div>
            </div>

            {/* Drawer */}
            <div
                className={`fixed bottom-0 left-0 w-full h-full bg-card z-10 transition-transform transform scrollarea overflow-y-auto duration-300 ${
                    isDrawerOpen ? "translate-y-0" : "translate-y-full -z-10"
                }`}
                style={{ height: "100%" }}
            >
                <div className="container mx-auto p-4 h-full">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold tracking-tight sm:leading-snug leading-5">Now Playing</h2>
                        <button onClick={() => setIsDrawerOpen(false)} className="text-2xl">
                            <IoMdClose />
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-10 justify-center h-[calc(100%-73px)] min-h-[500px]">
                        <div className="flex gap-4 flex-col items-center">
                            <div className="hidden sm:block">
                                <Thumbnail size="240" imgSrc={thumb} />
                            </div>
                            <div className="sm:hidden block">
                                <Thumbnail size="200" imgSrc={thumb} />
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <h3 className="sm:text-xl text-base font-semibold leading-tight">{stationName}</h3>
                                <p className="text-muted-foreground sm:text-base text-sm">
                                    {stationCountry}
                                    {stationCountry && stationState ? ", " : ""}
                                    {stationState ?? stationState}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-2/3 gap-10">
                            <div>
                                <button onClick={onPlayPause} className="text-4xl">
                                    {isPlaying ? (
                                        <FaCirclePause size={64} className="text-primary" />
                                    ) : (
                                        <FaCirclePlay size={64} className="text-primary" />
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center gap-2 justify-center w-full sm:w-2/3 lg:w-1/2">
                                <button
                                    className="text-muted-foreground"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleMute();
                                    }}
                                >
                                    {isMuted ? <HiVolumeOff size={20} /> : <HiVolumeUp size={20} />}
                                </button>
                                <input
                                    className="slider flex-1"
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    onClick={(e) => e.stopPropagation()}
                                    style={
                                        {
                                            "--value": `${(isMuted ? 0 : volume) * 100}%`,
                                            width: "100%",
                                        } as React.CSSProperties
                                    }
                                />
                            </div>
                        </div>
                        <div className="hidden">{tags}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
