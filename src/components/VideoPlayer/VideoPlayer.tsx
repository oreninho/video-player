import React, { useRef, useState } from 'react';
import { Play } from '../../icons/Play';
import { Pause } from '../../icons/Pause';
import { Volume } from '../../icons/Volume';
import { Mute } from '../../icons/Mute';
import './VideoPlayer.css';

interface VideoPlayerProps {
    src: string;
    width?: string;
    height?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src,width,height }) => {
    const videoRef = useRef<HTMLVideoElement |null>(null);
    const timelineRef = useRef<HTMLDivElement|null>(null);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [trimStart, setTrimStart] = useState(0);
    const [trimEnd, setTrimEnd] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [muted, setMuted] = useState(false);

    const dragState = useRef<{ type: 'start' | 'end' | null; initialX: number; initialTime: number }>({
        type: null,
        initialX: 0,
        initialTime: 0,
    });

    const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        setDuration(video.duration);
        setTrimEnd(video.duration);
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        setCurrentTime(e.currentTarget.currentTime);
    };

    const seek = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
        }
    };

    const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = timelineRef.current?.getBoundingClientRect();
        if (!rect) return;
        const clickX = e.clientX - rect.left;
        seek((clickX / rect.width) * duration);
    };

    const onHandlePointerDown = (e: React.PointerEvent, type: 'start' | 'end') => {
        e.preventDefault();
        if (!timelineRef.current) return;
        dragState.current = { type, initialX: e.clientX, initialTime: type === 'start' ? trimStart : trimEnd };
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
    };

    const onPointerMove = (e: PointerEvent) => {
        if (!timelineRef.current) return;
        const { type, initialX, initialTime } = dragState.current;
        if (!type) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const deltaTime = ((e.clientX - initialX) / rect.width) * duration;
        const newTime = initialTime + deltaTime;
        if (type === 'start') setTrimStart(Math.max(0, Math.min(newTime, trimEnd)));
        else setTrimEnd(Math.max(trimStart, Math.min(newTime, duration)));
    };
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        if (videoRef.current) {
            videoRef.current.volume = vol;
        }
        if (vol === 0) {
            setMuted(true);
        } else if (muted) {
            setMuted(false);
        }
    };


    const onPointerUp = () => {
        dragState.current.type = null;
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }

    return (
        <div className="video-player">
            <video
                onClick={togglePlay}
                width={width || "600"}
                height={height || "360"}
                muted={muted}
                ref={videoRef}
                src={src}
                className="video-element"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
            />
            <div className="controls">
                <button onClick={() => setMuted(!muted)} className="mute-button">
                    {muted ? <Mute className={"icon"}/> : <Volume className={"icon"}/>}
                </button>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                />
                <button onClick={togglePlay}>{isPlaying?<Pause className={"icon"}/>:<Play className={"icon"}/>}</button>
                <span className={"time"}>{currentTime.toFixed(2)} / {duration.toFixed(2)}</span>

            </div>
            <div className="timeline" ref={timelineRef} onClick={handleTimelineClick}>
                <div className="progress" style={{ width: `${(currentTime / duration) * 100}%` }} />
                <div
                    className="trim-range"
                    style={{
                        left: `${(trimStart / duration) * 100}%`,
                        width: `${((trimEnd - trimStart) / duration) * 100}%`,
                    }}
                >
                    <div className="handle start" onPointerDown={e => onHandlePointerDown(e, 'start')} />
                    <div className="handle end" onPointerDown={e => onHandlePointerDown(e, 'end')} />
                </div>
            </div>
        </div>
    );
};
export default VideoPlayer;