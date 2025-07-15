import React, {useRef} from "react";

export function useRangeDrag(
    container: React.RefObject<HTMLDivElement>,
    duration: number,
    trimStart: number,
    trimEnd: number,
    setTrimRange: (start?: number, end?: number) => void
) {
    const drag = useRef<{
        type: 'start'|'end'|null;
        originX: number;
        originTime: number;
        oppositeTime: number;
        rectLeft: number;
        rectWidth: number;
    }>({ type:null, originX:0, originTime:0, oppositeTime:0, rectLeft:0, rectWidth:0 });

    const onDown = (e: React.PointerEvent, type: 'start'|'end') => {
        e.preventDefault();
        const bar = container.current!;
        const { left, width } = bar.getBoundingClientRect();
        drag.current = {
            type,
            originX:      e.clientX,
            originTime:   type === 'start' ? trimStart : trimEnd,
            oppositeTime: type === 'start' ? trimEnd   : trimStart,
            rectLeft:     left,
            rectWidth:    width,
        };
        // start listening
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup',   onUp);
    };

    let frame: number|undefined;
    const lastX = useRef(0);

    const onMove = (e: PointerEvent) => {
        // stash the latest cursor pos
        lastX.current = e.clientX;

        if (frame) return;

        frame = requestAnimationFrame(() => {
            const {type, originX, originTime, oppositeTime, rectWidth} = drag.current;
            if (!type) return;
            const deltaPx   = lastX.current - originX;
            const pct       = deltaPx / rectWidth;
            const rawTime   = originTime + pct * duration;

            if (type === 'start') {
                setTrimRange(Math.min(Math.max(0, rawTime), oppositeTime));
            } else {
                setTrimRange(undefined,Math.max(oppositeTime, Math.min(rawTime, duration)));
            }

            frame = undefined;
        });
    };


    const onUp = () => {
        drag.current.type = null;
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        if (frame) cancelAnimationFrame(frame);
    };
    return {
        onDown,
        onMove,
        onUp,
    };
}
