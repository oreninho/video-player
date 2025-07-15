
import React, {useRef,useContext} from 'react';
import './Timeline.css';
import {VideoContext} from "../../videoContext.ts";
import {useVideoThumbnails} from "../../hooks/useVideoThumbnails.ts";



export const Timeline: React.FC = () => {
    const {videoRef, duration, currentTime, seek} = useContext(VideoContext);
    const barRef = useRef<HTMLDivElement|null>(null);
     const {thumbs} =  useVideoThumbnails(videoRef,barRef, duration);


    const handleClick = (e: React.MouseEvent) => {
        if (!barRef.current) return;
        const { left, width } = barRef.current.getBoundingClientRect();
        console.log(`left: ${left}, width: ${width}`, `clientX: ${e.clientX}`);
        const pct = (e.clientX - left) / width;
        seek(pct * duration);
    };

    return (
        <div className="timeline" ref={barRef} onClick={handleClick}>
            <div className="thumbnails">
                { thumbs.map((src, i) => (
                    <div
                        key={i}
                        className="thumb"
                        style={{ backgroundImage: `url(${src})` }}
                    />
                ))}
            </div>
            <div className="progress" style={{ width: `${(currentTime / duration) * 100}%` }}>
                <div className={'progress-handle'} style={{ left: `${(currentTime / duration) * 100}%` }} />
            </div>
        </div>
    );
};
