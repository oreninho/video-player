import React, {FC, useContext, useRef} from 'react';
import './TrimBar.css';
import {VideoContext} from "../../videoContext.ts";
import {useRangeDrag} from "../../hooks/useRangeDrag.ts";



export const TrimBar: FC = () => {
    const container = useRef<HTMLDivElement>(null);
    const { duration, trimStart, trimEnd, setTrimRange } = useContext(VideoContext);
     const {onDown} = useRangeDrag(container, duration, trimStart, trimEnd, setTrimRange);
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
