import { useParams, useNavigate } from 'react-router-dom';
import { Template, RoomConfig } from '@/types/template';
import { getAllTemplates } from '@/lib/templateData';
import { ActivationService } from '@/lib/activationService';
import { RoomInterface } from '@/components/RoomInterface';
import { useEffect, useState } from 'react';

const RoomPage = () => {
  const { templateId, roomType } = useParams<{ templateId: string; roomType: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<RoomConfig | null>(null);
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (!templateId || !roomType) {
      navigate('/');
      return;
    }

    const templates = getAllTemplates();
    const foundTemplate = templates.find(t => t.id === templateId);
    
    if (!foundTemplate) {
      navigate('/');
      return;
    }

    // Check if template is activated
    const isActivated = ActivationService.isTemplateActivated(templateId);
    if (!isActivated) {
      navigate('/');
      return;
    }

    // Find the specific room
    let foundRoom: RoomConfig | null = null;
    if (roomType === 'wake') foundRoom = foundTemplate.rooms.wakeRoom;
    else if (roomType === 'zang') foundRoom = foundTemplate.rooms.zangRoom;
    else if (roomType === 'beamer') foundRoom = foundTemplate.rooms.beamerRoom;

    if (!foundRoom) {
      navigate(`/template/${templateId}`);
      return;
    }

    setTemplate(foundTemplate);
    setRoom(foundRoom);
  }, [templateId, roomType, navigate]);

  const handleBack = () => {
    navigate(`/template/${templateId}`);
  };

  if (!room || !template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <RoomInterface 
          room={room} 
          onBack={handleBack} 
        />
      </div>
    </div>
  );
};

export default RoomPage;