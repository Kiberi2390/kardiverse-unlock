import React, { useState } from 'react';
import { RoomConfig, RoomComponent } from '@/types/template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Activity, Monitor, ArrowLeft, Music, Play, Volume2 } from 'lucide-react';
import { AudioPlayer } from '@/components/AudioPlayer';
import { WakeSongGenerator } from '@/components/WakeSongGenerator';

interface RoomInterfaceProps {
  room: RoomConfig;
  onBack: () => void;
}

export const RoomInterface = ({ room, onBack }: RoomInterfaceProps) => {
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const generateToken = () => {
    const prefix = room.type.toUpperCase();
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `#${prefix}${year}`;
  };

  const getRoomExperience = () => {
    switch (room.type) {
      case 'wake':
        return {
          title: 'WakeRoom™',
          subtitle: 'AI PRAYER',
          mainText: 'Grant him eternal rest, O Lord.',
          buttonText: 'PLAY PRAYER',
          backgroundImage: '/lovable-uploads/b2d2ec80-7922-47a4-9710-00e811a6277a.png',
          icon: '✝',
          extraElement: null
        };
      case 'zang':
        return {
          title: '✝ ZangRoom™',
          subtitle: 'AI Song Playing: "You Did It"',
          mainText: 'Kardiverse AI Choir',
          buttonText: 'PLAY SONG',
          backgroundImage: '/lovable-uploads/46b42a7e-aa3b-4080-a6b0-499e3ba517d7.png',
          icon: '♪',
          extraElement: (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Floating music notes */}
              <div className="absolute top-20 left-12 text-white/80 animate-bounce text-2xl">♪</div>
              <div className="absolute top-32 right-16 text-white/80 animate-bounce delay-300 text-xl">♫</div>
              <div className="absolute top-28 right-24 text-white/80 animate-bounce delay-700 text-lg">♪</div>
              <div className="absolute bottom-32 left-20 text-white/60 animate-bounce delay-1000 text-xl">♫</div>
            </div>
          )
        };
      case 'beamer':
        return {
          title: 'BeamerRoom™',
          subtitle: 'AI Projection Playing',
          mainText: '',
          buttonText: 'PLAY BEAMERROOM',
          backgroundImage: '/lovable-uploads/6537270b-b0c9-4f4c-9427-e1097cbe59c7.png',
          icon: '📽',
          extraElement: (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Beamer device */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-8 bg-slate-800/80 rounded-md shadow-lg border border-slate-600"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
                {/* Projection light beam */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-2 h-40 bg-gradient-to-t from-blue-400/60 via-blue-300/40 to-transparent opacity-70 blur-sm"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 h-40 bg-gradient-to-t from-blue-400/80 via-blue-300/60 to-transparent"></div>
              </div>
            </div>
          )
        };
      default:
        return {
          title: room.name,
          subtitle: '',
          mainText: '',
          buttonText: 'PLAY',
          background: 'bg-gradient-to-b from-primary/20 to-primary/40',
          icon: '○',
          extraElement: null
        };
    }
  };

  const experience = getRoomExperience();
  const token = generateToken();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${experience.backgroundImage}')`,
          filter: 'brightness(0.4) contrast(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
      
      {/* Back button */}
      <div className="absolute top-4 left-4 z-20">
        <Button 
          onClick={onBack} 
          variant="glass" 
          size="icon"
          className="bg-black/20 border-white/20 text-white hover:bg-black/30"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center text-white">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">
          {experience.title}
        </h1>
        
        {/* Subtitle */}
        {experience.subtitle && (
          <p className="text-sm md:text-base text-white/80 mb-8 font-medium tracking-wide">
            {experience.subtitle}
          </p>
        )}

        {/* Main visual element */}
        <div className="relative mb-12">
          {experience.extraElement}
        </div>

        {/* Main text */}
        {experience.mainText && (
          <p className="text-xl md:text-2xl font-semibold mb-8 text-white/90 max-w-md leading-relaxed">
            {experience.mainText}
          </p>
        )}

        {/* Audio Player for ZangRoom */}
        {room.type === 'zang' && (
          <div className="mb-8 w-full max-w-md space-y-4">
            {/* Wake Song Generator */}
            <WakeSongGenerator 
              onSongGenerated={(audioUrl) => setCustomAudioUrl(audioUrl)}
            />
            
            {/* Audio Player */}
            {(customAudioUrl || room.audio) && (
              <AudioPlayer
                audioUrl={customAudioUrl || room.audio?.url || ''}
                trackTitle={customAudioUrl ? 'AI Generated Wake Song' : room.audio?.title || 'Unknown Track'}
                autoPlay={false}
                className="w-full"
              />
            )}
          </div>
        )}

        {/* Main action button for other rooms */}
        {room.type !== 'zang' && (
          <Button 
            size="lg" 
            className="mb-16 px-12 py-6 text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 hover:from-amber-300 hover:to-yellow-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            {experience.buttonText}
          </Button>
        )}

        {/* Token and activation info */}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-white/90">
            QR Token: {token}
          </p>
          <p className="text-sm text-white/70">
            Activated via QR{room.type === 'wake' ? '/NFC' : room.type === 'zang' ? '/NFC' : ''}
          </p>
        </div>
      </div>
    </div>
  );

};