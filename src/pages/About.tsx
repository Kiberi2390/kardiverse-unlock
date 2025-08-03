import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cross, Heart, Users, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cross className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Kardiverse D6
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionary room integration technology for spiritual experiences
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To create meaningful spiritual connections through innovative AI-powered room experiences.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Building bridges between technology and faith, serving communities worldwide.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Innovation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pioneering the future of spiritual technology with WakeRoom, ZangRoom, and BeamerRoom.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* About Content */}
        <Card className="bg-gradient-card border-primary/30">
          <CardHeader>
            <CardTitle>The Kardiverse D6 Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Kardiverse D6 Room Integration represents a breakthrough in spiritual technology, 
              offering three distinct experiences designed to enhance prayer, worship, and remembrance.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                <h3 className="font-semibold text-yellow-400 mb-2">WakeRoom™</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered prayer experiences for spiritual farewell and remembrance.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                <h3 className="font-semibold text-blue-400 mb-2">ZangRoom™</h3>
                <p className="text-sm text-muted-foreground">
                  Emotional musical experiences through AI-generated worship songs.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                <h3 className="font-semibold text-purple-400 mb-2">BeamerRoom™</h3>
                <p className="text-sm text-muted-foreground">
                  Immersive projection-based spiritual visualizations.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6">
              Each template is carefully crafted to provide authentic spiritual experiences 
              while leveraging cutting-edge AI technology. Our platform serves churches, 
              mosques, and spiritual communities seeking to enhance their worship and 
              memorial services.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;