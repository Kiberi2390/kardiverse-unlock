import { useParams, useNavigate } from 'react-router-dom';
import { Template } from '@/types/template';
import { getAllTemplates } from '@/lib/templateData';
import { ActivationService } from '@/lib/activationService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Zap, Radio, Cpu, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

const TemplatePage = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (!templateId) {
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

    setTemplate(foundTemplate);
  }, [templateId, navigate]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading template...</p>
        </div>
      </div>
    );
  }

  const getRoomIcon = (type: string) => {
    switch (type) {
      case 'wake': return <Zap className="w-6 h-6" />;
      case 'zang': return <Radio className="w-6 h-6" />;
      case 'beamer': return <Cpu className="w-6 h-6" />;
      default: return <Cpu className="w-6 h-6" />;
    }
  };

  const getRoomColor = (type: string) => {
    switch (type) {
      case 'wake': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'zang': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'beamer': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      default: return 'text-primary border-primary/30 bg-primary/10';
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate('/')} 
            variant="glass" 
            size="icon"
            className="shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-glow">
              {template.config.title}
            </h1>
            <p className="text-muted-foreground">{template.config.description}</p>
          </div>
          
          <Badge variant="outline" className="bg-success/20 text-success border-success/30 ml-auto">
            Active
          </Badge>
        </div>

        {/* Template Info */}
        <Card className="bg-gradient-card border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Template Overview
            </CardTitle>
            <CardDescription>
              Integrated room system with advanced capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{template.config.version}</div>
                <div className="text-xs text-muted-foreground">Version</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">3</div>
                <div className="text-xs text-muted-foreground">Rooms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {Object.values(template.rooms).reduce((acc, room) => acc + room.components.length, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{template.config.author}</div>
                <div className="text-xs text-muted-foreground">Author</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Room Selection */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(template.rooms).map(([key, room]) => (
              <Card 
                key={key}
                className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-glow ${getRoomColor(room.type)} border-2`}
                onClick={() => navigate(`/template/${template.id}/room/${room.type}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getRoomIcon(room.type)}
                      <div>
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {room.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm">
                    {room.description}
                  </CardDescription>

                  {/* Room stats */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-2 bg-card/30 rounded">
                      <div className="font-bold">{room.components.length}</div>
                      <div className="text-xs text-muted-foreground">Components</div>
                    </div>
                    <div className="p-2 bg-card/30 rounded">
                      <div className="font-bold">{Object.keys(room.settings).length}</div>
                      <div className="text-xs text-muted-foreground">Settings</div>
                    </div>
                  </div>

                  {/* Key settings preview */}
                  <div className="space-y-1">
                    {Object.entries(room.settings).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}:
                        </span>
                        <span>{String(value)}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="cyber" 
                    className="w-full group-hover:shadow-lg"
                    size="sm"
                  >
                    Enter {room.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;