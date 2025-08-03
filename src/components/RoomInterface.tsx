import { RoomConfig, RoomComponent } from '@/types/template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Activity, Monitor, ArrowLeft, Music, Play, Volume2 } from 'lucide-react';

interface RoomInterfaceProps {
  room: RoomConfig;
  onBack: () => void;
}

export const RoomInterface = ({ room, onBack }: RoomInterfaceProps) => {
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
          background: 'bg-gradient-to-b from-amber-900/20 via-orange-800/30 to-amber-900/40',
          icon: '✝',
          extraElement: (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Church altar scene */}
                <div className="w-80 h-48 bg-gradient-to-t from-amber-800/40 to-transparent rounded-lg relative overflow-hidden">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-amber-600/80 rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-12 w-8 h-1 bg-amber-600/60 rounded-full"></div>
                  <div className="absolute bottom-4 left-1/3 w-2 h-8 bg-amber-500/40 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 right-1/3 w-2 h-8 bg-amber-500/40 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )
        };
      case 'zang':
        return {
          title: '✝ ZangRoom™',
          subtitle: 'AI Song Playing: "You Did It"',
          mainText: 'Kardiverse AI Choir',
          buttonText: 'PLAY SONG',
          background: 'bg-gradient-to-b from-stone-600/20 via-amber-700/20 to-stone-800/30',
          icon: '♪',
          extraElement: (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Church interior with cross */}
                <div className="w-80 h-48 bg-gradient-to-t from-amber-700/30 to-transparent rounded-lg relative overflow-hidden">
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-2 h-12 bg-amber-400/80 rounded-full"></div>
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-amber-400/80 rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-amber-800/60 rounded-t-lg"></div>
                  {/* Floating music notes */}
                  <div className="absolute top-16 left-8 text-white/60 animate-bounce">♪</div>
                  <div className="absolute top-24 right-12 text-white/60 animate-bounce delay-300">♫</div>
                  <div className="absolute top-20 right-8 text-white/60 animate-bounce delay-700">♪</div>
                </div>
              </div>
            </div>
          )
        };
      case 'beamer':
        return {
          title: 'BeamerRoom™',
          subtitle: 'AI Projection Playing',
          mainText: '',
          buttonText: 'PLAY BEAMERROOM',
          background: 'bg-gradient-to-b from-slate-800/30 via-blue-900/20 to-slate-900/40',
          icon: '📽',
          extraElement: (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Projection screen and beamer */}
                <div className="w-80 h-48 bg-gradient-to-b from-blue-200/20 to-amber-300/30 rounded-lg relative overflow-hidden border-4 border-slate-600/40">
                  {/* Cross on screen */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-16 bg-amber-600/80 rounded-full"></div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-amber-600/80 rounded-full"></div>
                  </div>
                  {/* Mountain landscape */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-amber-700/40 via-amber-600/30 to-transparent"></div>
                </div>
                {/* Beamer device */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-slate-600 rounded-md"></div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                {/* Projection light beam */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-32 bg-gradient-to-t from-blue-400/60 to-transparent opacity-70"></div>
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
      <div className={`absolute inset-0 ${experience.background}`} />
      
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

        {/* Main action button */}
        <Button 
          size="lg" 
          className="mb-16 px-12 py-6 text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 hover:from-amber-300 hover:to-yellow-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Play className="w-5 h-5 mr-2" />
          {experience.buttonText}
        </Button>

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