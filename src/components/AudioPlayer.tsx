import React, { useRef, useEffect, useState, useCallback } from "react";
import Thumbnail from "./ui snippets/Thumbnail";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "./ui/drawer";
import { Loader2, TriangleAlert } from "lucide-react";
import Alert from "./Alert";
import { ScrollArea } from "./ui/scroll-area";
import { useRadioContext } from "@/context/RadioContext";
import { getCountryName } from "@/lib/utils";
import PlayCircleIcon from "./assets/icons/PlayCircleIcon";
import PauseCircleIcon from "./assets/icons/PauseCircleIcon";
import VolumeUpIcon from "./assets/icons/VolumeUpIcon";
import VolumeOffIcon from "./assets/icons/VolumeOffIcon";

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
    const { currentSong, stationInfo } = useRadioContext();
    const { isLoading, setIsLoading } = useRadioContext();

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.src = audioUrl;
            audio.load();
            if (isPlaying) {
                audio
                    .play()
                    .catch((error) => {
                        console.error("Error playing audio:", error);
                        setError("Station could not be played :-(");
                        onPlayPause();
                    })
                    .finally(() => {
                        setIsLoading(false);
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

    const renderPlayPauseButton = (size: number) => {
        if (isLoading) {
            return <Loader2 size={size} className="text-primary animate-spin" />;
        }
        return isPlaying ? (
            <div className="text-primary">
                <PauseCircleIcon size={size} />
            </div>
        ) : (
            <div className="text-primary">
                <PlayCircleIcon size={size} />
            </div>
        );
    };

    const country = getCountryName(stationCountry);

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
                        <div className="flex items-center">
                            <div className="flex gap-4 items-center sm:justify-between justify-start flex-1">
                                <div className="h-12 sm:h-10">
                                    <button className="controls-area" onClick={handlePlayPause}>
                                        <div className="sm:hidden block">{renderPlayPauseButton(48)}</div>
                                        <div className="sm:block hidden">{renderPlayPauseButton(40)}</div>
                                    </button>
                                </div>
                                <div className="flex sm:gap-4 gap-3 items-center">
                                    <div className="sm:hidden block">
                                        <Thumbnail
                                            key={`mobile-${stationName}`}
                                            size="56"
                                            imgSrc={thumb}
                                            stationName={stationName}
                                        />
                                    </div>
                                    <div className="sm:block hidden">
                                        <Thumbnail
                                            key={stationName}
                                            size="64"
                                            imgSrc={thumb}
                                            stationName={stationName}
                                        />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <div className="font-semibold text-ellipsis line-clamp-1 break-all max-w-md sm:text-base text-sm text-left">
                                            {stationName}
                                        </div>
                                        <div className="sm:text-base text-sm text-muted-foreground">
                                            {currentSong ? (
                                                <div className="line-clamp-1 max-w-sm text-ellipsis text-left">
                                                    {currentSong ? currentSong.name : ""}
                                                </div>
                                            ) : stationInfo ? (
                                                <div className="line-clamp-1 max-w-sm text-ellipsis text-left">
                                                    {stationInfo}
                                                </div>
                                            ) : (
                                                <div className="line-clamp-1 text-left">
                                                    {country}
                                                    {country && stationState ? ", " : ""}
                                                    {stationState}
                                                </div>
                                            )}
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
                                        {isMuted ? <VolumeOffIcon size={24} /> : <VolumeUpIcon size={24} />}
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
                                        <ScrollArea className="sm:text-xl text-base font-semibold leading-5 sm:leading-6 max-h-10 h-fit sm:max-h-12 overflow-auto sm:max-w-xl max-w-xs">
                                            {stationName}
                                        </ScrollArea>
                                        <div className="sm:text-base text-sm text-muted-foreground">
                                            {currentSong ? (
                                                <ScrollArea className="leading-5 sm:leading-6 max-h-10 h-fit sm:max-h-12 overflow-auto sm:max-w-xl max-w-xs">
                                                    {currentSong ? currentSong.name : ""}
                                                </ScrollArea>
                                            ) : stationInfo ? (
                                                <ScrollArea className="leading-5 sm:leading-6 max-h-10 h-fit sm:max-h-12 overflow-auto sm:max-w-xl max-w-xs">
                                                    {stationInfo}
                                                </ScrollArea>
                                            ) : (
                                                <div>
                                                    {country}
                                                    {country && stationState ? ", " : ""}
                                                    {stationState}
                                                </div>
                                            )}
                                        </div>
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
                                            {isMuted ? <VolumeOffIcon size={20} /> : <VolumeUpIcon size={20} />}
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
