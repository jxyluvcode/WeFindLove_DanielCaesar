import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState([50]);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (value: number[]) => {
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value[0] / 100;
            setIsMuted(value[0] === 0);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            const newMutedState = !isMuted;
            setIsMuted(newMutedState);
            audioRef.current.muted = newMutedState;
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume[0] / 100;
        }
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-pink-200 p-4 shadow-lg z-50 animate-in slide-in-from-bottom duration-700">
            <div className="max-w-4xl mx-auto flex items-center justify-between">

                {/* Song Info */}
                <div className="flex items-center space-x-3 w-1/3">
                    <div className="w-12 h-12 bg-pink-200 rounded-md overflow-hidden shadow-sm animate-spin-slow">
                        <img src="https://scontent.fbkk12-6.fna.fbcdn.net/v/t39.30808-6/310652120_424945413125687_7393200112796932410_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=UP5jUrrpgMEQ7kNvwEbWWML&_nc_oc=Adk4iYwfGluUeDm8OyytOGZrm6dtvkejc9A42fmwwQEBbFl7SWeKdRWZyX4Sx4QD0Oc&_nc_zt=23&_nc_ht=scontent.fbkk12-6.fna&_nc_gid=5a-pEcx1okG8ScuGqy9dCg&oh=00_AfsY9P4v_vSXEy9SJX2Kzetpo8XtIHukNwEiBLjGdcA3rw&oe=69960E9F" alt="Album Art for UME - Saliva Bastards" className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-bold text-pink-900 truncate">UME - Saliva Bastards</p>
                        {/* <p className="text-xs text-pink-600 truncate">ศิลปินคนโปรด</p> */}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center w-1/3">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-pink-400 hover:text-pink-600" aria-label="Previous song">
                            <SkipBack size={20} className="fill-current" aria-hidden="true" />
                        </Button>
                        <Button
                            onClick={togglePlay}
                            size="icon"
                            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full w-10 h-10 shadow-md hover:scale-105 transition-transform"
                            aria-label={isPlaying ? "Pause music" : "Play music"}
                        >
                            {isPlaying ? <Pause size={20} className="fill-current" aria-hidden="true" /> : <Play size={20} className="fill-current ml-1" aria-hidden="true" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-pink-400 hover:text-pink-600" aria-label="Next song">
                            <SkipForward size={20} className="fill-current" aria-hidden="true" />
                        </Button>
                    </div>
                </div>

                {/* Volume */}
                <div className="flex items-center justify-end space-x-2 w-1/3">
                    <Button variant="ghost" size="icon" onClick={toggleMute} className="text-pink-500 hover:bg-pink-100" aria-label={isMuted || volume[0] === 0 ? "Unmute" : "Mute"}>
                        {isMuted || volume[0] === 0 ? <VolumeX size={20} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
                    </Button>
                    <div className="w-20 sm:w-32">
                        <Slider
                            value={volume}
                            onValueChange={handleVolumeChange}
                            max={100}
                            step={1}
                            className="cursor-pointer"
                            aria-label="Volume"
                        />
                    </div>
                </div>
            </div>

            {/* Hidden Audio Element */}
            {/* Replace src with your actual audio file */}
            <audio ref={audioRef} loop>
                <source src="/music/ume.mp3" type="audio/mpeg" />

            </audio>
        </div>
    );
}
