import React, {createContext} from 'react';

export interface VideoContextType {
    videoRef: React.RefObject<HTMLVideoElement>;
    duration: number;
    currentTime: number;
    isPlaying: boolean;
    muted: boolean;
    trimStart: number;
    trimEnd: number;

    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    seek: (time: number) => void;
    toggleMute: () => void;
    setTrimRange: (start: number, end: number) => void;
    handleLoadedMetadata: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
    handleTimeUpdate: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
}

export const VideoContext = createContext<VideoContextType | undefined>(undefined);

