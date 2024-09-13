import React, { useRef, useEffect, useState } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import Thumbnail from "./ui snippets/Thumbnail";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
// import { HeartIcon, Share2Icon } from "lucide-react";

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

    useEffect(() => {
        // Load volume and mute state from localStorage
        const storedVolume = localStorage.getItem("volume");
        const storedIsMuted = localStorage.getItem("isMuted");
        if (storedVolume !== null) {
            setVolume(parseFloat(storedVolume));
            if (audioRef.current) {
                audioRef.current.volume = parseFloat(storedVolume);
                audioRef.current.muted = storedIsMuted === "true";
            }
            setIsMuted(storedIsMuted === "true");
        }
    }, []);

    useEffect(() => {
        // Save volume and mute state to localStorage
        localStorage.setItem("volume", volume.toString());
        localStorage.setItem("isMuted", isMuted.toString());
    }, [volume, isMuted]);

    return (
        <div className="relative h-full w-full">
            <audio ref={audioRef} />
            <div className="h-full w-full gap-4 cursor-pointer flex items-center">
                <Drawer>
                    <DrawerTrigger
                        className="w-full ring-0 border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
        focus-visible:ring-offset-0 active:outline-none text-card-foreground sm:px-0 px-[9px]"
                    >
                        <div className="flex items-center justify-between">
                            <>
                                <div className="flex gap-4 items-center">
                                    <div className="h-12 sm:h-10">
                                        <button
                                            className="controls-area"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onPlayPause();
                                            }}
                                        >
                                            <div className="sm:hidden block">
                                                {isPlaying ? (
                                                    <FaCirclePause size={48} className="text-primary" />
                                                ) : (
                                                    <FaCirclePlay size={48} className="text-primary" />
                                                )}
                                            </div>
                                            <div className="sm:block hidden">
                                                {isPlaying ? (
                                                    <FaCirclePause size={40} className="text-primary" />
                                                ) : (
                                                    <FaCirclePlay size={40} className="text-primary" />
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                    <div className="flex gap-2 sm:gap-4 items-center">
                                        <div className="sm:hidden block">
                                            <Thumbnail size="64" imgSrc={thumb} />
                                        </div>
                                        <div className="sm:block hidden">
                                            <Thumbnail size="72" imgSrc={thumb} />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <div className="font-bold text-ellipsis line-clamp-1 break-all max-w-xl sm:text-base text-sm text-left">
                                                {stationName}
                                            </div>
                                            <div className="sm:text-sm text-xs text-muted-foreground line-clamp-1 text-left">
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
                                        className="text-muted-foreground"
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
                                        style={
                                            { "--value": `${(isMuted ? 0 : volume) * 100 - 1}%` } as React.CSSProperties
                                        }
                                    />
                                </div>
                            </>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="px-4 h-full pb-8 container mx-auto">
                            <div className="w-full text-center text-lg font-bold tracking-tight">Now Playing</div>
                            <div className="flex flex-col items-center gap-10 justify-center h-[calc(100%-68px)] min-h-[596px]">
                                <div className="flex gap-4 flex-col items-center">
                                    <div className="hidden sm:block">
                                        <Thumbnail size="240" imgSrc={thumb} />
                                    </div>
                                    <div className="sm:hidden block">
                                        <Thumbnail size="200" imgSrc={thumb} />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <h3 className="sm:text-xl text-base font-semibold leading-5 sm:leading-6 max-h-10 sm:max-h-12 overflow-auto scrollarea sm:max-w-xl max-w-xs">
                                            {stationName}
                                        </h3>
                                        <p className="text-muted-foreground sm:text-base text-sm">
                                            {stationCountry}
                                            {stationCountry && stationState ? ", " : ""}
                                            {stationState ?? stationState}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center w-2/3 gap-10">
                                    <div className="h-16 flex justify-center items-center gap-12">
                                        {/* <button>
                                            <Share2Icon />
                                        </button> */}
                                        <button
                                            onClick={onPlayPause}
                                            className="text-4xl"
                                            aria-label="play/pause button"
                                        >
                                            {isPlaying ? (
                                                <FaCirclePause size={64} className="text-primary" />
                                            ) : (
                                                <FaCirclePlay size={64} className="text-primary" />
                                            )}
                                        </button>
                                        {/* <button>
                                            <HeartIcon />
                                        </button> */}
                                    </div>
                                    <div className="flex items-center justify-center w-full sm:w-2/3 lg:w-1/3 h-6 gap-2">
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
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    );
};

export default AudioPlayer;
