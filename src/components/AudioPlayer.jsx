import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

export default function AudioPlayer({ autoPlayTrigger, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // If autoPlayTrigger is toggled (e.g. user clicked OPEN INVITATION)
    if (autoPlayTrigger && !hasInteracted) {
      setHasInteracted(true);
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log('Autoplay deferred until explicit click:', err);
        });
      }
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasInteracted(true);
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Audio playback error:', err);
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        onError={() => setLoadError(true)}
      />

      {/* Floating Music Control Button */}
      <div className="fixed bottom-6 right-5 z-40 flex items-center gap-2">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Tạm dừng nhạc nền' : 'Bật nhạc nền'}
          title={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc nền'}
          className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-full border border-vintage-border bg-cream-50/90 backdrop-blur-md shadow-lg shadow-vintage-espresso/10 transition-all duration-300 hover:scale-105 active:scale-95 text-vintage-dark focus:outline-none focus:ring-2 focus:ring-sage-500`}
        >
          {/* Spinning Vinyl Record Icon */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Disc
              className={`w-7 h-7 text-vintage-sepia transition-transform ${
                isPlaying ? 'animate-spin-slow text-sage-600' : 'text-vintage-muted'
              }`}
            />
            <div className={`absolute w-2 h-2 rounded-full ${isPlaying ? 'bg-sage-600' : 'bg-vintage-muted'}`} />
          </div>

          {/* Soundwave bars */}
          <div className="hidden sm:flex items-center gap-0.5 h-4 px-1">
            <span
              className={`w-1 rounded-full bg-sage-500 transition-all duration-300 ${
                isPlaying ? 'h-3 animate-pulse' : 'h-1.5 opacity-40'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-sage-600 transition-all duration-500 ${
                isPlaying ? 'h-4 animate-bounce' : 'h-2 opacity-40'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-sage-500 transition-all duration-300 ${
                isPlaying ? 'h-2.5 animate-pulse' : 'h-1 opacity-40'
              }`}
            />
          </div>

          <span className="text-xs font-serif tracking-wider text-vintage-brown font-medium pr-1">
            {isPlaying ? 'Nhạc nền: Bật' : 'Nhạc nền: Tắt'}
          </span>
        </button>
      </div>
    </>
  );
}
