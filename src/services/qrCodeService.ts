import QRCode from 'qrcode';

export class QRCodeService {
  async generateQR(text: string, options?: any): Promise<string> {
    try {
      const qrOptions = {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M',
        ...options
      };

      const dataUrl = await QRCode.toDataURL(text, qrOptions);
      return dataUrl;
    } catch (error) {
      console.error('QR Code generation failed:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  async generateQRWithLogo(text: string, logoUrl?: string): Promise<string> {
    // Enhanced QR code with custom styling
    const qrOptions = {
      width: 300,
      margin: 3,
      color: {
        dark: '#1f2937',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H' // Higher error correction for logo overlay
    };

    try {
      const dataUrl = await QRCode.toDataURL(text, qrOptions);
      
      if (logoUrl) {
        // In a real implementation, you would overlay the logo on the QR code
        // This requires canvas manipulation which is more complex
        return dataUrl;
      }
      
      return dataUrl;
    } catch (error) {
      console.error('QR Code with logo generation failed:', error);
      throw new Error('Failed to generate QR code with logo');
    }
  }

  async generateBatchQRCodes(items: Array<{ text: string; filename: string }>): Promise<Array<{ filename: string; dataUrl: string }>> {
    const results = [];
    
    for (const item of items) {
      try {
        const dataUrl = await this.generateQR(item.text);
        results.push({
          filename: item.filename,
          dataUrl
        });
      } catch (error) {
        console.error(`Failed to generate QR code for ${item.filename}:`, error);
      }
    }
    
    return results;
  }
}