import React,{ useState, useCallback } from 'react';

export function useVolumeControls(videoRef: React.RefObject<HTMLVideoElement>) {
    const [muted, setMuted] = useState(false);

    const toggleMute = useCallback(() => {
        setMuted( prevState => {
            const toggledState = !prevState;
            if (videoRef.current) videoRef.current.muted = toggledState;
            return toggledState;
        });
    }, [videoRef]);

    return { muted, toggleMute };
}
