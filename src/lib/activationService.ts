import { TEST_ACTIVATION_CODES } from './templateData';

export class ActivationService {
  private static STORAGE_KEY = 'kardiverse_activations';

  static getActivatedTemplates(): string[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static isTemplateActivated(templateId: string): boolean {
    const activated = this.getActivatedTemplates();
    return activated.includes(templateId);
  }

  static activateTemplate(activationCode: string): { success: boolean; templateId?: string; message: string } {
    const cleanCode = activationCode.trim().toUpperCase();
    
    // Check if it's a valid activation code
    const templateId = TEST_ACTIVATION_CODES[cleanCode as keyof typeof TEST_ACTIVATION_CODES];
    
    if (!templateId) {
      return {
        success: false,
        message: 'Invalid activation code. Please check your code and try again.'
      };
    }

    // Check if already activated
    if (this.isTemplateActivated(templateId)) {
      return {
        success: false,
        message: 'This template is already activated.'
      };
    }

    // Activate the template
    const activated = this.getActivatedTemplates();
    activated.push(templateId);
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(activated));
      return {
        success: true,
        templateId,
        message: `Successfully activated ${templateId}!`
      };
    } catch {
      return {
        success: false,
        message: 'Failed to save activation. Please try again.'
      };
    }
  }

  static deactivateTemplate(templateId: string): boolean {
    try {
      const activated = this.getActivatedTemplates();
      const filtered = activated.filter(id => id !== templateId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  }

  static clearAllActivations(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  }

  static generateQRCodeData(templateId: string): string {
    // Generate QR code data format for the template
    const qrData = {
      type: 'kardiverse_activation',
      templateId,
      timestamp: Date.now(),
      version: '1.0'
    };
    return JSON.stringify(qrData);
  }

  static parseQRCodeData(qrData: string): { success: boolean; templateId?: string; message: string } {
    try {
      const parsed = JSON.parse(qrData);
      
      if (parsed.type !== 'kardiverse_activation') {
        return {
          success: false,
          message: 'Invalid QR code format.'
        };
      }

      // For demo purposes, accept any valid QR format
      const templateId = parsed.templateId;
      if (!templateId || !templateId.startsWith('Template_')) {
        return {
          success: false,
          message: 'Invalid template ID in QR code.'
        };
      }

      return this.activateTemplate(`QR-${templateId.split('_')[1]}-UNLOCK`);
    } catch {
      return {
        success: false,
        message: 'Failed to parse QR code data.'
      };
    }
  }
}