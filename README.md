# Video Player Component

This project implements a customizable video player component using React and TypeScript. It provides features such as video playback, volume control, mute functionality, and trimming capabilities.

## Features

- **Video Playback**: Play, pause, and seek functionality.
- **Volume Control**: Adjust volume and toggle mute.
- **Trimming**: Set start and end points for video playback.
- **Context Management**: Centralized state management using React Context.
- **Reusable Hooks**: Custom hooks for video metadata and trim range management.

## Project Structure

- `src/components/VideoPlayer/VideoPlayer.tsx`: Main video player component.
- `src/components/VideoPlayer/hooks/useVideoMetadata.ts`: Custom hook for managing video metadata.
- `src/components/VideoPlayer/hooks/useVideoTrimRange.ts`: Custom hook for managing video trim range.
- `src/components/VideoPlayer/components/TrimBar/TrimBar.css`: Styles for the trim bar component.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>

## Usage
- `import VideoPlayer from './components/VideoPlayer/VideoPlayer';`
- Use the `VideoPlayer` component in your application:
   ```jsx
   <VideoPlayer
     videoSrc="path/to/video.mp4"
   />
   ```
 ## Development
1.Navigate to the project directory:
   ```bash
   cd video-player-component
   ```
2.Install dependencies:
   ```bash npm install```
3. Start the development server:
4.```bash npm run dev```
5.Open your browser and navigate to `http://localhost:5173/` to see the video player in action.