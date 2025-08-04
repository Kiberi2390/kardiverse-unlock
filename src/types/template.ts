export interface Template {
  id: string;
  name: string;
  isUnlocked: boolean;
  licenseId?: string;
  config: TemplateConfig;
  rooms: {
    wakeRoom: RoomConfig;
    zangRoom: RoomConfig;
    beamerRoom: RoomConfig;
  };
}

export interface TemplateConfig {
  title: string;
  description: string;
  version: string;
  author: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundImage?: string;
  };
}

export interface RoomConfig {
  id: string;
  name: string;
  type: 'wake' | 'zang' | 'beamer';
  description: string;
  settings: Record<string, any>;
  components: RoomComponent[];
  audio?: {
    url: string;
    title: string;
    isLocal?: boolean;
  };
}

export interface RoomComponent {
  id: string;
  type: string;
  name: string;
  config: Record<string, any>;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ActivationCode {
  code: string;
  templateId: string;
  expiresAt?: Date;
  isValid: boolean;
}