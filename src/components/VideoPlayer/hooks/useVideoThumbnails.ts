import React,{useEffect, useState} from "react";
import {generateThumbnails} from "../../../utils/thumnnails.ts";

export function useVideoThumbnails(videoRef: React.RefObject<HTMLVideoElement>, barRef:React.RefObject<HTMLDivElement>, duration: number) {
    const [thumbs, setThumbs] = useState<string[]>([]);


    useEffect(() => {
        const video = videoRef.current;
        const bar = barRef.current;
        if (!video || !bar || !duration) return;
        generateThumbnails(video).then((thumbnails) => {
            setThumbs(thumbnails);

        });

    }, [videoRef, duration]);
    return { thumbs };
}