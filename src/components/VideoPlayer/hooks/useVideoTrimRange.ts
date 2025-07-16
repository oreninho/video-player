import React,{ useState, useEffect, useCallback } from 'react';

export function useVideoTrimRange(videoRef: React.RefObject<HTMLVideoElement>,duration: number,setCurrentTime: (time: number) => void,  setIsPlaying: (isPlaying: boolean) => void) {
    const [trimStart, setTrimStart] = useState(0);
    const [trimEnd,   setTrimEnd]   = useState(0);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = trimStart;
            setCurrentTime(trimStart);
        }
    }, [trimStart, videoRef, setCurrentTime]);

    useEffect(() => {
        setTrimEnd(duration);

    }, [duration]);


    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const handleTrimEndEdge = () => {
            if (video.currentTime > trimEnd) {
                video.pause();
                setIsPlaying(false);
                video.currentTime = trimEnd;
                setCurrentTime(trimEnd);
            }
        };
        video.addEventListener('timeupdate', handleTrimEndEdge);
        return () => {
            video.removeEventListener('timeupdate', handleTrimEndEdge);
        };
    }, [trimEnd, videoRef, setCurrentTime]);

    const setTrimRange = useCallback((start?: number, end?: number) => {
        if (start) setTrimStart(start);
        if (end) setTrimEnd(end);
    }, []);

    return { trimStart, trimEnd, setTrimRange };
}
