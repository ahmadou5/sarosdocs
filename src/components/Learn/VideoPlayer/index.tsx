"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "../VideoPlayer/index.module.css";

// TypeScript interfaces
interface YouTubePlayerProps {
  videoUrl: string;
  title?: string;
  autoplay?: boolean;
  showControls?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
}

interface PlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  showControls: boolean;
  isLoading: boolean;
}

// Utility function to extract YouTube video ID
const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
};

// Format time helper
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Main YouTube Player Component
const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoUrl,
  title = "YouTube Video",
  autoplay = false,
  showControls = false,
  width = "100%",
  height = "500px",
  className = "",
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    isMuted: false,
    volume: 100,
    currentTime: 0,
    duration: 0,
    isFullscreen: false,
    showControls: true,
    isLoading: true,
  });

  const videoId = extractVideoId(videoUrl);

  // Auto-hide controls
  const handleMouseMove = () => {
    setPlayerState((prev) => ({ ...prev, showControls: true }));

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      setPlayerState((prev) => ({ ...prev, showControls: false }));
    }, 3000);
  };

  // Fullscreen functionality
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setPlayerState((prev) => ({ ...prev, isFullscreen: true }));
      } else {
        await document.exitFullscreen();
        setPlayerState((prev) => ({ ...prev, isFullscreen: false }));
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setPlayerState((prev) => ({
        ...prev,
        isFullscreen: !!document.fullscreenElement,
      }));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Handle iframe load
  const handleIframeLoad = () => {
    setPlayerState((prev) => ({ ...prev, isLoading: false }));
  };

  // Volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseInt(e.target.value);
    setPlayerState((prev) => ({
      ...prev,
      volume,
      isMuted: volume === 0,
    }));
  };

  // Toggle mute
  const toggleMute = () => {
    setPlayerState((prev) => ({
      ...prev,
      isMuted: !prev.isMuted,
      volume: prev.isMuted ? 50 : 0,
    }));
  };

  if (!videoId) {
    return (
      <div className={`${styles.errorContainer} ${className}`}>
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          <p>Invalid YouTube URL. Please provide a valid YouTube link.</p>
        </div>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams(
    {
      autoplay: autoplay ? "1" : "0",
      controls: "1", // We'll use custom controls
      rel: "0",
      modestbranding: "1",
      fs: "1",
      cc_load_policy: "0",
      iv_load_policy: "3",
      autohide: "0",
    }
  ).toString()}`;

  return (
    <div className={`${styles.playerContainer} ${className}`}>
      <div
        ref={containerRef}
        className={`${styles.videoWrapper} ${
          playerState.isFullscreen ? styles.fullscreen : ""
        }`}
        style={{ width, height: playerState.isFullscreen ? "100vh" : height }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() =>
          setPlayerState((prev) => ({ ...prev, showControls: false }))
        }
      >
        {/* Loading Spinner */}
        {playerState.isLoading && (
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
          </div>
        )}

        {/* Video Title */}
        <div
          className={`${styles.videoTitle} ${
            playerState.showControls ? styles.visible : ""
          }`}
        >
          <h3>{title}</h3>
        </div>

        {/* YouTube Iframe */}
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={handleIframeLoad}
          className={styles.videoFrame}
        />

        {/* Custom Controls Overlay */}
        {showControls && (
          <div
            className={`${styles.controlsOverlay} ${
              playerState.showControls ? styles.visible : ""
            }`}
          >
            <div className={styles.controlsBackground} />

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFilled}
                  style={{ width: "30%" }} // Placeholder
                />
                <div
                  className={styles.progressHandle}
                  style={{ left: "30%" }}
                />
              </div>
            </div>

            {/* Bottom Controls */}
            <div className={styles.bottomControls}>
              {/* Left Controls */}
              <div className={styles.leftControls}>
                <button className={styles.controlBtn} aria-label="Play/Pause">
                  <span className={styles.playIcon}>
                    {playerState.isPlaying ? "⏸️" : "▶️"}
                  </span>
                </button>

                <button
                  className={styles.controlBtn}
                  onClick={toggleMute}
                  aria-label={playerState.isMuted ? "Unmute" : "Mute"}
                >
                  <span className={styles.volumeIcon}>
                    {playerState.isMuted || playerState.volume === 0
                      ? "🔇"
                      : playerState.volume < 50
                      ? "🔉"
                      : "🔊"}
                  </span>
                </button>

                <div className={styles.volumeContainer}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={playerState.isMuted ? 0 : playerState.volume}
                    onChange={handleVolumeChange}
                    className={styles.volumeSlider}
                    aria-label="Volume"
                  />
                </div>

                <div className={styles.timeDisplay}>
                  <span>
                    {formatTime(playerState.currentTime)} /{" "}
                    {formatTime(playerState.duration || 600)}
                  </span>
                </div>
              </div>

              {/* Right Controls */}
              <div className={styles.rightControls}>
                <button className={styles.controlBtn} aria-label="Settings">
                  <span className={styles.settingsIcon}>⚙️</span>
                </button>

                <button
                  className={styles.controlBtn}
                  onClick={toggleFullscreen}
                  aria-label={
                    playerState.isFullscreen ? "Exit Fullscreen" : "Fullscreen"
                  }
                >
                  <span className={styles.fullscreenIcon}>
                    {playerState.isFullscreen ? "⛶" : "⛶"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Usage Example Component
const YouTubePlayerExample: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  );
  const [customTitle, setCustomTitle] = useState("Sample YouTube Video");

  return (
    <div className={styles.exampleContainer}>
      <div className={styles.inputSection}>
        <h2>YouTube Player Demo</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="videoUrl">YouTube URL:</label>
          <input
            id="videoUrl"
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter YouTube URL..."
            className={styles.urlInput}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="videoTitle">Custom Title:</label>
          <input
            id="videoTitle"
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Enter video title..."
            className={styles.titleInput}
          />
        </div>
      </div>

      <YouTubePlayer
        videoUrl={videoUrl}
        title={customTitle}
        autoplay={false}
        showControls={true}
        width="100%"
        height="500px"
      />
    </div>
  );
};

export default YouTubePlayerExample;
export { YouTubePlayer };
