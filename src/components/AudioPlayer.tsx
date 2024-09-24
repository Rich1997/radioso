import React, { useRef, useEffect, useState, useCallback } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import Thumbnail from "./ui snippets/Thumbnail";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "./ui/drawer";
import { TriangleAlert } from "lucide-react";
import Alert from "./Alert";

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
    const [volume, setVolume] = useState(() => {
        const storedVolume = localStorage.getItem("volume");
        return storedVolume ? parseFloat(storedVolume) : 1;
    });
    const [isMuted, setIsMuted] = useState(() => {
        return localStorage.getItem("isMuted") === "true";
    });
    const [error, setError] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.src = audioUrl;
            audio.load();
            if (isPlaying) {
                audio.play().catch((error) => {
                    console.error("Error playing audio:", error);
                    setError("Station could not be played :-(");
                    onPlayPause();
                });
            }
        }
    }, [audioUrl]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.play().catch((error) => {
                    console.error("Error playing audio:", error);
                    setError("Station cannot be played :-(");
                    setShowAlert(true);
                    onPlayPause();
                });
            } else {
                audio.pause();
            }
        }
    }, [isPlaying, onPlayPause]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;
            audio.muted = isMuted;
        }
    }, [volume, isMuted]);

    const handleVolumeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        localStorage.setItem("volume", newVolume.toString());
        localStorage.setItem("isMuted", (newVolume === 0).toString());
    }, []);

    const toggleMute = useCallback(() => {
        setIsMuted((prev) => {
            const newMuted = !prev;
            localStorage.setItem("isMuted", newMuted.toString());
            return newMuted;
        });
    }, []);

    const handlePlayPause = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            setError(null); // Clear any previous errors
            onPlayPause();
        },
        [onPlayPause]
    );

    const renderPlayPauseButton = (size: number) =>
        isPlaying ? (
            <FaCirclePause size={size} className="text-primary" />
        ) : (
            <FaCirclePlay size={size} className="text-primary" />
        );

    return (
        <div className="relative h-full w-full">
            <audio ref={audioRef} />
            {error && (
                <Alert
                    isOpen={showAlert}
                    onOpenChange={setShowAlert}
                    icon={<TriangleAlert />}
                    errorMessage="Playback error"
                    errorDescription={error}
                    dialogActionText="Okay"
                />
            )}
            <div className="h-full w-full gap-4 cursor-pointer flex items-center">
                <Drawer>
                    <DrawerTrigger
                        className="w-full ring-0 border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 active:outline-none text-card-foreground px-0 select-none"
                        asChild={true}
                    >
                        <div className="flex items-center sm:justify-between justify-start gap-4">
                            <div className="flex gap-4 items-center">
                                <div className="h-12 sm:h-10">
                                    <button className="controls-area" onClick={handlePlayPause}>
                                        <div className="sm:hidden block">{renderPlayPauseButton(48)}</div>
                                        <div className="sm:block hidden">{renderPlayPauseButton(40)}</div>
                                    </button>
                                </div>
                                <div className="flex gap-2 sm:gap-4 items-center">
                                    <Thumbnail
                                        key={`mobile-${stationName}`}
                                        size="64"
                                        imgSrc={thumb}
                                        stationName={stationName}
                                    />

                                    <div className="flex flex-col items-start">
                                        <div className="font-bold text-ellipsis line-clamp-1 break-all max-w-md sm:text-base text-sm text-left">
                                            {stationName}
                                        </div>
                                        <div className="sm:text-sm text-xs text-muted-foreground line-clamp-1 text-left">
                                            {stationCountry}
                                            {stationCountry && stationState ? ", " : ""}
                                            {stationState}
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
                                    style={{ "--value": `${(isMuted ? 0 : volume) * 100 - 1}%` } as React.CSSProperties}
                                />
                            </div>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="px-4 h-full pb-8 container mx-auto">
                            <DrawerTitle className="w-full text-center text-lg font-bold tracking-tight">
                                Now Playing
                            </DrawerTitle>
                            <div className="flex flex-col items-center gap-10 justify-center h-[calc(100%-68px)] min-h-[596px]">
                                <div className="flex gap-4 flex-col items-center">
                                    <div className="hidden sm:block">
                                        <Thumbnail size="240" imgSrc={thumb} stationName={stationName} />
                                    </div>
                                    <div className="sm:hidden block">
                                        <Thumbnail size="200" imgSrc={thumb} stationName={stationName} />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <h3 className="sm:text-xl text-base font-semibold leading-5 sm:leading-6 max-h-10 sm:max-h-12 overflow-auto scrollarea sm:max-w-xl max-w-xs">
                                            {stationName}
                                        </h3>
                                        <p className="text-muted-foreground sm:text-base text-sm">
                                            {stationCountry}
                                            {stationCountry && stationState ? ", " : ""}
                                            {stationState}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center w-2/3 gap-10">
                                    <div className="h-16 flex justify-center items-center gap-12">
                                        <button
                                            onClick={onPlayPause}
                                            className="text-4xl"
                                            aria-label="play/pause button"
                                        >
                                            {renderPlayPauseButton(64)}
                                        </button>
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
