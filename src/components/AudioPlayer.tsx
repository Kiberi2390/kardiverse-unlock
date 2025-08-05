import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

interface AudioPlayerProps {
  audioUrl: string;
  trackTitle?: string;
  autoPlay?: boolean;
  className?: string;
}

export const AudioPlayer = ({ 
  audioUrl, 
  trackTitle = "Unknown Track", 
  autoPlay = false, 
  className = "" 
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset states when audioUrl changes
    setIsLoading(true);
    setError(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    const handleLoadedMetadata = () => {
      console.log('Audio metadata loaded:', audioUrl);
      setDuration(audio.duration);
      setIsLoading(false);
      if (autoPlay) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error('Autoplay failed:', err);
            setError("Autoplay blocked by browser");
          });
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      const audioElement = e.target as HTMLAudioElement;
      const errorCode = audioElement.error?.code;
      let errorMessage = "Failed to load audio file";
      
      switch (errorCode) {
        case MediaError.MEDIA_ERR_ABORTED:
          errorMessage = "Audio loading was aborted";
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          errorMessage = "Network error while loading audio";
          break;
        case MediaError.MEDIA_ERR_DECODE:
          errorMessage = "Audio format not supported or corrupted";
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = "Audio format not supported by browser";
          break;
        default:
          errorMessage = "Unknown audio error occurred";
      }
      
      setError(errorMessage);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      console.log('Audio can play:', audioUrl);
      setError(null);
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      console.log('Audio load started:', audioUrl);
      setIsLoading(true);
    };

    const handleWaiting = () => {
      console.log('Audio waiting for data');
    };

    const handleCanPlayThrough = () => {
      console.log('Audio can play through');
      setIsLoading(false);
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    // Force load the audio
    audio.load();

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [audioUrl, autoPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      setError("Failed to play audio");
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio && duration) {
      const newTime = (value[0] / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <Card className={`bg-black/60 backdrop-blur-sm border-white/20 text-white ${className}`}>
      <div className="p-6 space-y-4">
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
        />

        {/* Track title */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white/90 mb-1">{trackTitle}</h3>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          {isLoading && (
            <p className="text-sm text-white/60">Loading audio...</p>
          )}
        </div>

        {/* Play/Pause button */}
        <div className="flex justify-center">
          <Button
            onClick={togglePlayPause}
            disabled={isLoading || !!error}
            size="lg"
            className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 hover:from-amber-300 hover:to-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full"
            disabled={isLoading || !!error}
          />
          
          {/* Time indicators */}
          <div className="flex justify-between text-xs text-white/70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-3">
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          
          <div className="flex-1">
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};