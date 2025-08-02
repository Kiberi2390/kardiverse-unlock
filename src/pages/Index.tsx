import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Template } from '@/types/template';
import { getAllTemplates } from '@/lib/templateData';
import { ActivationService } from '@/lib/activationService';
import { TemplateCard } from '@/components/TemplateCard';
import { ActivationModal } from '@/components/ActivationModal';
import { AdminPanel } from '@/components/AdminPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Search, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [adminClickCount, setAdminClickCount] = useState(0);

  useEffect(() => {
    setTemplates(getAllTemplates());
  }, []);

  const filteredTemplates = templates.filter(template =>
    template.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.config.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activatedTemplates = filteredTemplates.filter(template =>
    ActivationService.isTemplateActivated(template.id)
  );

  const lockedTemplates = filteredTemplates.filter(template =>
    !ActivationService.isTemplateActivated(template.id)
  );

  const handleViewTemplate = (template: Template) => {
    navigate(`/template/${template.id}`);
  };

  const handleActivationSuccess = (templateId: string) => {
    toast({
      title: "Template Activated!",
      description: `${templateId} is now available for use.`,
      variant: "default"
    });
    setTemplates(getAllTemplates()); // Refresh templates
  };

  const handleRefresh = () => {
    setTemplates(getAllTemplates());
  };

  const handleVersionClick = () => {
    setAdminClickCount(prev => prev + 1);
    if (adminClickCount >= 4) {
      setAdminClickCount(0);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-glow animate-float">
            Kardiverse D6
          </h1>
          <p className="text-xl text-muted-foreground">
            Room Integration System
          </p>
          <div 
            className="text-sm text-muted-foreground cursor-pointer select-none"
            onClick={handleVersionClick}
          >
            v1.0.0 - {adminClickCount}/5 for admin
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="bg-gradient-card border-primary/30 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Template Library
            </CardTitle>
            <CardDescription>
              100 pre-installed client templates with advanced room integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100</div>
                <div className="text-sm text-muted-foreground">Total Templates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">{activatedTemplates.length}</div>
                <div className="text-sm text-muted-foreground">Activated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning">{lockedTemplates.length}</div>
                <div className="text-sm text-muted-foreground">Locked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">3</div>
                <div className="text-sm text-muted-foreground">Rooms Each</div>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass"
                />
              </div>
              
              <div className="flex gap-2">
                <ActivationModal onActivationSuccess={handleActivationSuccess}>
                  <Button variant="cyber" className="flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Activate Template
                  </Button>
                </ActivationModal>

                {adminClickCount >= 5 && (
                  <AdminPanel onRefresh={handleRefresh}>
                    <Button variant="glass" size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </AdminPanel>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Templates */}
        {activatedTemplates.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-success mb-4">
              Active Templates ({activatedTemplates.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {activatedTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onViewTemplate={handleViewTemplate}
                  onRefresh={handleRefresh}
                />
              ))}
            </div>
          </div>
        )}

        {/* Locked Templates */}
        <div>
          <h2 className="text-2xl font-bold text-muted-foreground mb-4">
            Locked Templates ({lockedTemplates.length})
          </h2>
          {lockedTemplates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold mb-2">All Templates Activated!</h3>
              <p className="text-muted-foreground">
                You have activated all available templates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {lockedTemplates.slice(0, 20).map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onViewTemplate={handleViewTemplate}
                  onRefresh={handleRefresh}
                />
              ))}
            </div>
          )}
          
          {lockedTemplates.length > 20 && (
            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                ... and {lockedTemplates.length - 20} more locked templates
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
