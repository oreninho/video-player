import React, { useState, useCallback } from 'react';

export function useVideoMetadata() {
    const [duration, setDuration]     = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        setCurrentTime(e.currentTarget.currentTime);
    };
    const handleLoadedMetadata = useCallback( (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        setDuration(video.duration);

    }, []);

    return { duration, currentTime, handleLoadedMetadata, handleTimeUpdate, setCurrentTime };
}
