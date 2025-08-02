import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Trash2, Key, RefreshCw } from 'lucide-react';
import { ActivationService } from '@/lib/activationService';
import { TEST_ACTIVATION_CODES } from '@/lib/templateData';
import { toast } from '@/hooks/use-toast';

interface AdminPanelProps {
  children: React.ReactNode;
  onRefresh?: () => void;
}

export const AdminPanel = ({ children, onRefresh }: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const activatedTemplates = ActivationService.getActivatedTemplates();

  const handleTestActivation = (templateId: string) => {
    const testCode = Object.entries(TEST_ACTIVATION_CODES).find(
      ([_, id]) => id === templateId
    )?.[0];
    
    if (testCode) {
      const result = ActivationService.activateTemplate(testCode);
      if (result.success) {
        toast({
          title: "Test Activation Successful",
          description: `Activated ${templateId} for testing`,
          variant: "default"
        });
        onRefresh?.();
      } else {
        toast({
          title: "Activation Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    }
  };

  const handleDeactivate = (templateId: string) => {
    const success = ActivationService.deactivateTemplate(templateId);
    if (success) {
      toast({
        title: "Template Deactivated",
        description: `${templateId} has been deactivated`,
        variant: "default"
      });
      onRefresh?.();
    } else {
      toast({
        title: "Deactivation Failed",
        description: "Failed to deactivate template",
        variant: "destructive"
      });
    }
  };

  const handleClearAll = () => {
    const success = ActivationService.clearAllActivations();
    if (success) {
      toast({
        title: "All Activations Cleared",
        description: "All templates have been deactivated",
        variant: "default"
      });
      onRefresh?.();
    } else {
      toast({
        title: "Clear Failed",
        description: "Failed to clear activations",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl glass border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-glow">
            <Settings className="w-5 h-5" />
            Admin Debug Panel
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Test Activations */}
          <Card className="bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Test Activations</CardTitle>
              <CardDescription>
                Activate templates for testing purposes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleTestActivation('Template_001')}
                  variant="cyber"
                  disabled={activatedTemplates.includes('Template_001')}
                >
                  <Key className="w-4 h-4 mr-2" />
                  Activate Template 001
                </Button>
                <Button
                  onClick={() => handleTestActivation('Template_002')}
                  variant="cyber"
                  disabled={activatedTemplates.includes('Template_002')}
                >
                  <Key className="w-4 h-4 mr-2" />
                  Activate Template 002
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Templates */}
          <Card className="bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Active Templates
                <Badge variant="outline">{activatedTemplates.length} active</Badge>
              </CardTitle>
              <CardDescription>
                Currently activated templates and management options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activatedTemplates.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No templates currently activated
                </p>
              ) : (
                <div className="space-y-2">
                  {activatedTemplates.map((templateId) => (
                    <div 
                      key={templateId}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-success/20"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                          Active
                        </Badge>
                        <span className="font-medium">{templateId}</span>
                      </div>
                      <Button
                        onClick={() => handleDeactivate(templateId)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Deactivate
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Debug Actions */}
          <Card className="bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Debug Actions</CardTitle>
              <CardDescription>
                Administrative tools and system controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={onRefresh}
                  variant="glass"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </Button>
                <Button
                  onClick={handleClearAll}
                  variant="destructive"
                  disabled={activatedTemplates.length === 0}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Test Codes */}
          <Card className="bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Available Test Codes</CardTitle>
              <CardDescription>
                Use these codes in the activation modal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(TEST_ACTIVATION_CODES).map(([code, templateId]) => (
                  <div 
                    key={code}
                    className="flex items-center justify-between p-2 bg-muted/20 rounded border"
                  >
                    <code className="text-sm font-mono">{code}</code>
                    <span className="text-sm text-muted-foreground">{templateId}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};