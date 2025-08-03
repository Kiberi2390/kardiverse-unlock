import { getAllTemplates } from '@/lib/templateData';
import { TemplateCard } from '@/components/TemplateCard';
import { ActivationModal } from '@/components/ActivationModal';
import { AdminPanel } from '@/components/AdminPanel';
import { useState } from 'react';
import { Package, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const templates = getAllTemplates();
  
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTemplate = (template: any) => {
    navigate(`/template/${template.id}`);
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold">Template Library</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Browse and activate Kardiverse D6 room integration templates
          </p>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onViewTemplate={handleViewTemplate}
            />
          ))}
        </div>

        {/* No results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No templates found matching your search.</p>
          </div>
        )}
      </div>

      {/* Activation and Admin Modals */}
      <ActivationModal>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Activate Template
        </Button>
      </ActivationModal>
      
      <AdminPanel>
        <Button variant="ghost" size="sm">
          Admin
        </Button>
      </AdminPanel>
    </div>
  );
};

export default Templates;