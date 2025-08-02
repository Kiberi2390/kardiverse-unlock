import { RoomConfig, RoomComponent } from '@/types/template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Activity, Monitor, ArrowLeft } from 'lucide-react';

interface RoomInterfaceProps {
  room: RoomConfig;
  onBack: () => void;
}

export const RoomInterface = ({ room, onBack }: RoomInterfaceProps) => {
  const renderComponent = (component: RoomComponent) => (
    <Card key={component.id} className="bg-card/50 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          {component.name}
        </CardTitle>
        <Badge variant="outline" className="w-fit text-xs">
          {component.type}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-xs text-muted-foreground">
          Position: {component.position.x}, {component.position.y}
        </div>
        <div className="text-xs text-muted-foreground">
          Size: {component.position.width} × {component.position.height}
        </div>
        {Object.entries(component.config).map(([key, value]) => (
          <div key={key} className="flex justify-between text-xs">
            <span className="text-muted-foreground">{key}:</span>
            <span>{String(value)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderSettings = () => (
    <div className="grid gap-4">
      {Object.entries(room.settings).map(([key, value]) => (
        <Card key={key} className="bg-card/50 border-primary/20">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <Badge variant="outline">
                {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : String(value)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const getRoomColor = () => {
    switch (room.type) {
      case 'wake': return 'text-yellow-400';
      case 'zang': return 'text-blue-400';
      case 'beamer': return 'text-purple-400';
      default: return 'text-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          onClick={onBack} 
          variant="glass" 
          size="icon"
          className="shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        
        <div>
          <h1 className={`text-2xl font-bold ${getRoomColor()} text-glow`}>
            {room.name}
          </h1>
          <p className="text-muted-foreground">{room.description}</p>
        </div>
      </div>

      {/* Room interface */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Components
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-gradient-card border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Room Status
              </CardTitle>
              <CardDescription>
                Real-time monitoring and control interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">Online</div>
                  <div className="text-xs text-muted-foreground">Status</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{room.components.length}</div>
                  <div className="text-xs text-muted-foreground">Components</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">75%</div>
                  <div className="text-xs text-muted-foreground">Performance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">v1.0</div>
                  <div className="text-xs text-muted-foreground">Version</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-primary/30">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="cyber" className="h-12">
                  Start {room.type === 'wake' ? 'Monitoring' : room.type === 'zang' ? 'Protocol' : 'Projection'}
                </Button>
                <Button variant="glass" className="h-12">
                  Calibrate System
                </Button>
                <Button variant="outline" className="h-12">
                  Run Diagnostics
                </Button>
                <Button variant="secondary" className="h-12">
                  Export Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {room.components.map(renderComponent)}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          {renderSettings()}
        </TabsContent>
      </Tabs>
    </div>
  );
};