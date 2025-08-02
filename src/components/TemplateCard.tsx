import { Template } from '@/types/template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, Eye, Cpu, Zap, Radio } from 'lucide-react';
import { ActivationService } from '@/lib/activationService';

interface TemplateCardProps {
  template: Template;
  onViewTemplate: (template: Template) => void;
  onRefresh?: () => void;
}

export const TemplateCard = ({ template, onViewTemplate, onRefresh }: TemplateCardProps) => {
  const isUnlocked = ActivationService.isTemplateActivated(template.id);
  
  const handleViewTemplate = () => {
    if (isUnlocked) {
      onViewTemplate(template);
    }
  };

  const getRoomIcon = (type: string) => {
    switch (type) {
      case 'wake': return <Zap className="w-4 h-4" />;
      case 'zang': return <Radio className="w-4 h-4" />;
      case 'beamer': return <Cpu className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`group transition-all duration-300 hover:scale-[1.02] ${
      isUnlocked 
        ? 'bg-gradient-card border-primary/30 shadow-card hover:shadow-glow' 
        : 'bg-gradient-locked border-border/50 opacity-75'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base">
              {isUnlocked ? (
                <Unlock className="w-4 h-4 text-success" />
              ) : (
                <Lock className="w-4 h-4 text-muted-foreground" />
              )}
              {template.config.title}
            </CardTitle>
            <CardDescription className="text-xs">
              {template.config.description}
            </CardDescription>
          </div>
          <Badge 
            variant={isUnlocked ? "default" : "secondary"}
            className={isUnlocked ? "bg-success/20 text-success border-success/30" : ""}
          >
            {isUnlocked ? 'Active' : 'Locked'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Room modules preview */}
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(template.rooms).map(([key, room]) => (
            <div 
              key={key}
              className={`p-2 rounded-md border text-center transition-colors ${
                isUnlocked 
                  ? 'bg-card/50 border-primary/20 hover:bg-primary/10' 
                  : 'bg-muted/30 border-border/30'
              }`}
            >
              <div className="flex items-center justify-center mb-1">
                {getRoomIcon(room.type)}
              </div>
              <p className="text-xs font-medium">{room.name}</p>
            </div>
          ))}
        </div>

        {/* Template info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Version:</span>
            <span>{template.config.version}</span>
          </div>
          <div className="flex justify-between">
            <span>Author:</span>
            <span>{template.config.author}</span>
          </div>
        </div>

        {/* Action button */}
        <Button
          onClick={handleViewTemplate}
          variant={isUnlocked ? "cyber" : "locked"}
          disabled={!isUnlocked}
          className="w-full"
          size="sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          {isUnlocked ? 'Enter Template' : 'Locked'}
        </Button>
      </CardContent>
    </Card>
  );
};