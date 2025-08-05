import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Music, X } from 'lucide-react';
import { AudioPlayer } from '@/components/AudioPlayer';

interface LocalAudioPickerProps {
  onAudioSelected?: (file: File, audioUrl: string) => void;
  className?: string;
}

export const LocalAudioPicker = ({ onAudioSelected, className }: LocalAudioPickerProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('audio/')) {
      setError('Please select a valid audio file (MP3, WAV, etc.)');
      return;
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setError('File size must be less than 50MB');
      return;
    }

    // Create object URL for the audio file
    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setAudioUrl(url);
    onAudioSelected?.(file, url);
  };

  const handleRemoveFile = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setSelectedFile(null);
    setAudioUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <Card className="bg-black/20 border-white/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* File picker section */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Load Your Own Song</h3>
              <p className="text-sm text-white/70 mb-4">
                Upload an MP3 or audio file from your device
              </p>
              
              {!selectedFile ? (
                <Button
                  onClick={triggerFileSelect}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Audio File
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-white/90">
                    <Music className="w-4 h-4" />
                    <span className="text-sm font-medium">{selectedFile.name}</span>
                    <Button
                      onClick={handleRemoveFile}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-white/60">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mt-2 text-sm text-red-300 bg-red-900/20 rounded p-2">
                  {error}
                </div>
              )}
            </div>

            {/* Audio player section */}
            {audioUrl && selectedFile && (
              <div className="pt-4 border-t border-white/20">
                <AudioPlayer
                  audioUrl={audioUrl}
                  trackTitle={selectedFile.name.replace(/\.[^/.]+$/, "")}
                  autoPlay={false}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};