import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Card } from '@/components/ui/card';

interface PowerfulAudioPlayerProps {
  audioUrl: string;
  trackTitle?: string;
  autoPlay?: boolean;
  className?: string;
}

export const PowerfulAudioPlayer = ({ 
  audioUrl, 
  trackTitle = "Unknown Track", 
  autoPlay = false, 
  className = "" 
}: PowerfulAudioPlayerProps) => {
  
  const handleError = (e: Event) => {
    console.error('Audio error occurred:', e);
  };

  const handleLoadStart = () => {
    console.log('Audio loading started:', audioUrl);
  };

  const handleCanPlay = () => {
    console.log('Audio can play:', audioUrl);
  };

  return (
    <Card className={`bg-black/60 backdrop-blur-sm border-white/20 text-white ${className}`}>
      <div className="p-6 space-y-4">
        {/* Track title */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white/90 mb-2">{trackTitle}</h3>
        </div>

        {/* Powerful Audio Player */}
        <div className="powerful-audio-player">
          <AudioPlayer
            src={audioUrl}
            autoPlay={autoPlay}
            showJumpControls={false}
            showSkipControls={false}
            showFilledProgress={true}
            showDownloadProgress={true}
            volume={0.8}
            loop={false}
            preload="metadata"
            onError={handleError}
            onLoadStart={handleLoadStart}
            onCanPlay={handleCanPlay}
            onPlay={() => console.log('Audio started playing')}
            onPause={() => console.log('Audio paused')}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: 'none',
            }}
          />
        </div>
      </div>
    </Card>
  );
};