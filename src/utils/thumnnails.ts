
export function generateThumbnails(
    video: HTMLVideoElement,
    interval: number = 1,
    count: number = 10
): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const thumbnails: string[] = [];
        const duration = video.duration;

        if (duration === Infinity || isNaN(duration)) {
            reject(new Error("Video duration is not valid."));
            return;
        }

        const totalIntervals = Math.min(Math.ceil(duration / interval), count);

        for (let i = 0; i < totalIntervals; i++) {
            const time = i * interval;
            video.currentTime = time;

            video.addEventListener(
                'seeked',
                function onSeeked() {
                    const canvas = document.createElement('canvas');
                    canvas.width = 160; // Thumbnail width
                    canvas.height = 90; // Thumbnail height
                    const context = canvas.getContext('2d');

                    if (context) {
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        thumbnails.push(canvas.toDataURL('image/jpeg', 0.7));
                    }

                    if (thumbnails.length === totalIntervals) {
                        resolve(thumbnails);
                        video.removeEventListener('seeked', onSeeked);
                    }
                },
                { once: true }
            );
        }
    });
}