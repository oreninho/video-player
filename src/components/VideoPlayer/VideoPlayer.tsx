import React, {useRef, useContext, ReactNode, FC} from 'react';
import './VideoPlayer.css';

import { PlayIcon }   from '../../icons/PlayIcon';
import { PauseIcon }  from '../../icons/PauseIcon';
import { VolumeIcon } from '../../icons/VolumeIcon';
import { MuteIcon }   from '../../icons/MuteIcon';

import { Timeline }   from './components/Timeline/Timeline';
import { TrimBar }    from './components/TrimBar/TrimBar';
import {VideoContext } from './VideoContext';
import {useVideoMetadata} from "./hooks/useVideoMetaData";
import {useVideoControls} from "./hooks/useVideoControls";
import {useVideoTrimRange} from "./hooks/useVideoTrimRange.ts";
import {useVolumeControls} from "./hooks/useVideoVolumeControls.ts";

const VideoProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const videoRef = useRef<HTMLVideoElement|null>(null);



    const  { muted, toggleMute } = useVolumeControls(videoRef);
    const { duration, currentTime, handleLoadedMetadata, handleTimeUpdate, setCurrentTime } = useVideoMetadata();
    const { play, pause, isPlaying, setIsPlaying, togglePlay, seek } = useVideoControls(videoRef, setCurrentTime);
    const {trimStart, trimEnd, setTrimRange }  = useVideoTrimRange(videoRef, duration, setCurrentTime, setIsPlaying);



    return (
        <VideoContext.Provider value={{
            videoRef,
            duration,
            currentTime,
            isPlaying,
            muted,
            trimStart,
            trimEnd,
            play,
            pause,
            togglePlay,
            seek,
            toggleMute,
            setTrimRange,
            handleLoadedMetadata,
            handleTimeUpdate
        }}>
            {children}
        </VideoContext.Provider>
    );
};

interface VideoLayoutProps {
    src: string;
    width?: string;
    height?: string;
}

const VideoLayout: FC<VideoLayoutProps> = ({src, width = '600', height = '360'}) => {

    const {
        videoRef,
        currentTime,
        duration,
        isPlaying,
        muted,
        togglePlay,
        toggleMute,
        handleLoadedMetadata,
        handleTimeUpdate
    } = useContext(VideoContext);

    return (
        <div className="video-player">
            {/* raw video element */}
            <video
                onClick={togglePlay}
                ref={videoRef as React.RefObject<HTMLVideoElement>}
                src={src}
                width={width}
                height={height}
                muted={muted}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                className="video-element"
            />
            <div className="controls">
                <button onClick={toggleMute} className="control-button">
                    {muted ? <MuteIcon   className="icon" /> : <VolumeIcon className="icon" />}
                </button>



                <button onClick={togglePlay} className="control-button">
                    {isPlaying ? <PauseIcon className="icon" /> : <PlayIcon  className="icon" />}
                </button>

                <span className="time">
          {currentTime.toFixed(2)} / {duration.toFixed(2)}
        </span>
            </div>
            <div className="timebar-container">
                <TrimBar />
                <Timeline />
            </div>
        </div>
    );
};


export const VideoPlayer: FC<VideoLayoutProps> = props => (
    <VideoProvider>
        <VideoLayout {...props} />
    </VideoProvider>
);

export default VideoPlayer;
