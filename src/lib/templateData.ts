import { Template, TemplateConfig, RoomConfig } from '@/types/template';

// Generate sample template data
export const generateTemplate = (id: number): Template => {
  const templateId = `Template_${id.toString().padStart(3, '0')}`;
  
  const config: TemplateConfig = {
    title: `Kardiverse ${templateId}`,
    description: `Advanced room integration template ${id}`,
    version: '1.0.0',
    author: 'Kardiverse Systems',
    theme: {
      primaryColor: `hsl(${(id * 13) % 360}, 70%, 50%)`,
      accentColor: `hsl(${(id * 17 + 120) % 360}, 60%, 60%)`,
      backgroundImage: `/assets/templates/${templateId}/background.jpg`
    }
  };

  const wakeRoom: RoomConfig = {
    id: `${templateId}_wake`,
    name: 'WakeRoom',
    type: 'wake',
    description: 'Advanced wake detection and alert system',
    settings: {
      sensitivity: 75,
      autoMode: true,
      alertDelay: 5,
      soundEnabled: true
    },
    components: [
      {
        id: 'wake_monitor',
        type: 'monitor',
        name: 'Wake Monitor',
        config: { refreshRate: 60, threshold: 0.8 },
        position: { x: 0, y: 0, width: 50, height: 30 }
      },
      {
        id: 'wake_alerts',
        type: 'alerts',
        name: 'Alert System',
        config: { priority: 'high', sound: 'chime' },
        position: { x: 50, y: 0, width: 50, height: 30 }
      }
    ]
  };

  const zangRoom: RoomConfig = {
    id: `${templateId}_zang`,
    name: 'ZangRoom',
    type: 'zang',
    description: 'Zang protocol communication hub',
    settings: {
      protocol: 'ZANGv2',
      encryption: true,
      compression: 'auto',
      bufferSize: 1024
    },
    components: [
      {
        id: 'zang_processor',
        type: 'processor',
        name: 'Zang Processor',
        config: { threads: 4, priority: 'realtime' },
        position: { x: 0, y: 30, width: 100, height: 40 }
      }
    ]
  };

  const beamerRoom: RoomConfig = {
    id: `${templateId}_beamer`,
    name: 'BeamerRoom',
    type: 'beamer',
    description: 'High-resolution beaming projection system',
    settings: {
      resolution: '4K',
      frameRate: 60,
      projection: 'holographic',
      powerMode: 'adaptive'
    },
    components: [
      {
        id: 'beamer_projector',
        type: 'projector',
        name: 'Main Projector',
        config: { brightness: 3000, contrast: 1000 },
        position: { x: 0, y: 70, width: 60, height: 30 }
      },
      {
        id: 'beamer_controls',
        type: 'controls',
        name: 'Beam Controls',
        config: { interface: 'touch', gestures: true },
        position: { x: 60, y: 70, width: 40, height: 30 }
      }
    ]
  };

  return {
    id: templateId,
    name: `${templateId} - Advanced Integration`,
    isUnlocked: false,
    config,
    rooms: {
      wakeRoom,
      zangRoom,
      beamerRoom
    }
  };
};

// Generate all 100 templates
export const getAllTemplates = (): Template[] => {
  return Array.from({ length: 100 }, (_, i) => generateTemplate(i + 1));
};

// Validation codes for testing
export const TEST_ACTIVATION_CODES = {
  'KARDI-001-UNLOCK': 'Template_001',
  'KARDI-002-UNLOCK': 'Template_002',
  'KARDI-DEBUG-ADMIN': 'Template_001', // Admin override
  'QR-TEST-001': 'Template_001',
  'QR-TEST-002': 'Template_002'
};