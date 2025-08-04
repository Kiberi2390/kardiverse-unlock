import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Music } from 'lucide-react';

interface WakeSongGeneratorProps {
  onSongGenerated: (audioUrl: string) => void;
}

export const WakeSongGenerator = ({ onSongGenerated }: WakeSongGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const wakeSongText = `
    Gently awakening your consciousness... 
    Rise with peaceful energy and clarity...
    Your spiritual journey begins with this moment of awakening...
    Feel the harmony flowing through your being...
    Embrace this new day with wisdom and light...
    The universe calls you to your highest purpose...
  `;

  const generateWakeSong = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/functions/v1/generate-wake-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: wakeSongText,
          voiceId: "9BWtsMINqrJLrRacOk9x" // Aria voice ID
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate wake song: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      onSongGenerated(audioUrl);
      toast.success("AI Wake Song generated successfully!");
      
    } catch (error) {
      console.error('Error generating wake song:', error);
      toast.error("Failed to generate wake song. Please check your ElevenLabs API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <Button
        onClick={generateWakeSong}
        disabled={isGenerating}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating AI Wake Song...
          </>
        ) : (
          <>
            <Music className="w-4 h-4 mr-2" />
            Generate AI Wake Song
          </>
        )}
      </Button>
      <p className="text-sm text-white/70 text-center">
        Using Aria voice to create a peaceful awakening experience
      </p>
    </div>
  );
};