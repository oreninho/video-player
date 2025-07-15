import React,{ useState, useCallback } from 'react';

export function useVideoControls(videoRef: React.RefObject<HTMLVideoElement>,setCurrentTime) {
    const [isPlaying, setIsPlaying] = useState(false);

    const play  = useCallback(() => {
        videoRef.current?.play();
        setIsPlaying(true);
    }, [videoRef]);

    const pause = useCallback(() => {
        videoRef.current?.pause();
        setIsPlaying(false);
    }, [videoRef]);

    const togglePlay = useCallback(() => {
        isPlaying ? pause() : play();
    }, [isPlaying, play, pause]);

    const seek  = useCallback((t: number) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = t;
        if (!isPlaying) {
            videoRef.current.play();
            setIsPlaying(true);
        }
        setCurrentTime(t);
    },[videoRef, setCurrentTime, isPlaying]);

    return { isPlaying, play, pause, togglePlay,seek };
}
