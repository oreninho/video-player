import React, {FC, useContext, useRef} from 'react';
import './TrimBar.css'; // Assuming you have a CSS file for styling the TrimBar component
import {VideoContext} from "../../videoContext.ts"; // for .trim-range & .handle



export const TrimBar: FC = () => {
    const container = useRef<HTMLDivElement>(null);
    const { duration, trimStart, trimEnd, setTrimRange } = useContext(VideoContext);
    const drag = useRef<{ type: 'start'|'end'|null; originX: number; originTime: number }>({
        type: null, originX: 0, originTime: 0,
    });

    const onDown = (e: React.PointerEvent, type: 'start'|'end') => {
        e.preventDefault();
        if (!container.current) return;
        drag.current = {
            type,
            originX: e.clientX,
            originTime: type === 'start' ? trimStart : trimEnd,
        };
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp);
    };

    const onMove = (e: PointerEvent) => {
        if (!container.current || !drag.current.type) return;
        const {  width } = container.current.getBoundingClientRect();
        const deltaPct = (e.clientX - drag.current.originX) / width;
        const deltaTime = deltaPct * duration;
        let start = trimStart, end = trimEnd;

        if (drag.current.type === 'start') {
            start = Math.max(0, Math.min(drag.current.originTime + deltaTime, trimEnd));
        } else {
            end = Math.max(trimStart, Math.min(drag.current.originTime + deltaTime, duration));
        }
        setTrimRange(start, end);
    };

    const onUp = () => {
        drag.current.type = null;
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
    };

    return (
        <div ref={container} className="trim-range"
             style={{
                 left:  `${(trimStart / duration) * 100}%`,
                 width: `${((trimEnd - trimStart) / duration) * 100}%`,
             }}
        >
            <div className="handle start" onPointerDown={e => onDown(e, 'start')} />
            <div className="handle end"   onPointerDown={e => onDown(e, 'end')} />
        </div>
    );
};
