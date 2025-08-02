import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Key, Scan } from 'lucide-react';
import { ActivationService } from '@/lib/activationService';
import { toast } from '@/hooks/use-toast';

interface ActivationModalProps {
  children: React.ReactNode;
  onActivationSuccess?: (templateId: string) => void;
}

export const ActivationModal = ({ children, onActivationSuccess }: ActivationModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleCodeActivation = async () => {
    if (!activationCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter an activation code.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    const result = ActivationService.activateTemplate(activationCode);
    
    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
        variant: "default"
      });
      setActivationCode('');
      setIsOpen(false);
      onActivationSuccess?.(result.templateId!);
    } else {
      toast({
        title: "Activation Failed",
        description: result.message,
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleQRScan = async () => {
    setIsScanning(true);
    
    try {
      // For demo purposes, simulate QR scan with test data
      const mockQRData = ActivationService.generateQRCodeData('Template_001');
      const result = ActivationService.parseQRCodeData(mockQRData);
      
      if (result.success) {
        toast({
          title: "QR Code Scanned!",
          description: result.message,
          variant: "default"
        });
        setIsOpen(false);
        onActivationSuccess?.(result.templateId!);
      } else {
        toast({
          title: "QR Scan Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Scan Error",
        description: "Failed to scan QR code. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsScanning(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-glow">
            <Key className="w-5 h-5" />
            Activate Template
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass">
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="qr" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              QR Scan
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="code" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="activation-code">Activation Code</Label>
              <Input
                id="activation-code"
                placeholder="Enter your activation code"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value)}
                className="glass"
                onKeyDown={(e) => e.key === 'Enter' && handleCodeActivation()}
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Test codes for demo:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code className="bg-muted px-1 rounded">KARDI-001-UNLOCK</code> - Template 001</li>
                <li><code className="bg-muted px-1 rounded">KARDI-002-UNLOCK</code> - Template 002</li>
              </ul>
            </div>
            
            <Button 
              onClick={handleCodeActivation} 
              className="w-full" 
              variant="cyber"
              disabled={isLoading}
            >
              {isLoading ? 'Activating...' : 'Activate Template'}
            </Button>
          </TabsContent>
          
          <TabsContent value="qr" className="space-y-4">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
                <QrCode className="w-12 h-12 text-primary/50" />
              </div>
              
              <p className="text-sm text-muted-foreground">
                Position your QR code within the scanner area
              </p>
              
              <Button 
                onClick={handleQRScan} 
                variant="scanner"
                disabled={isScanning}
                className="w-full"
              >
                <Scan className="w-4 h-4 mr-2" />
                {isScanning ? 'Scanning...' : 'Start QR Scanner'}
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Demo: This will simulate scanning a QR code for Template_001
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};