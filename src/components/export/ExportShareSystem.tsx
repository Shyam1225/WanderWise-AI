import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Share2, Calendar, Printer, QrCode, Link2, Mail, 
  MessageCircle, Facebook, Twitter, Instagram, Cloud, Save,
  FileText, Image, Smartphone, Globe, Copy, Check, X,
  Settings, Eye, Bookmark, Upload, RefreshCw, AlertCircle,
  CheckCircle, Clock, Users, MapPin, DollarSign, Camera
} from 'lucide-react';
import { Button } from '../ui/Button';
import { PDFExportService } from '../../services/pdfExportService';
import { CalendarExportService } from '../../services/calendarExportService';
import { QRCodeService } from '../../services/qrCodeService';
import { CloudBackupService } from '../../services/cloudBackupService';

interface ExportShareSystemProps {
  itinerary: any;
  destination: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  budget: number;
  onClose: () => void;
}

export function ExportShareSystem({ 
  itinerary, 
  destination, 
  startDate, 
  endDate, 
  groupSize, 
  budget,
  onClose 
}: ExportShareSystemProps) {
  const [activeTab, setActiveTab] = useState<'export' | 'share' | 'calendar' | 'backup'>('export');
  const [exportFormat, setExportFormat] = useState<'detailed' | 'compact' | 'emergency' | 'cultural'>('detailed');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [shareableLink, setShareableLink] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [backupStatus, setBackupStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [customBranding, setCustomBranding] = useState({
    includeWatermark: true,
    customTitle: '',
    customLogo: null as File | null,
    colorScheme: 'default'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'export', label: 'Export PDF', icon: Download },
    { id: 'share', label: 'Digital Sharing', icon: Share2 },
    { id: 'calendar', label: 'Calendar Sync', icon: Calendar },
    { id: 'backup', label: 'Cloud Backup', icon: Cloud },
  ];

  const exportFormats = [
    {
      id: 'detailed',
      name: 'Detailed Itinerary',
      description: 'Complete trip plan with all information, maps, and photos',
      icon: FileText,
      pages: '15-25 pages',
      features: ['Full activity details', 'Maps & directions', 'Restaurant info', 'Cultural tips']
    },
    {
      id: 'compact',
      name: 'Compact Travel Guide',
      description: 'Essential information in a pocket-friendly format',
      icon: Smartphone,
      pages: '5-8 pages',
      features: ['Key activities only', 'Quick reference', 'Emergency contacts', 'Offline friendly']
    },
    {
      id: 'emergency',
      name: 'Emergency Contact Sheet',
      description: 'Critical information for safety and emergencies',
      icon: AlertCircle,
      pages: '1-2 pages',
      features: ['Emergency numbers', 'Embassy info', 'Medical details', 'Insurance info']
    },
    {
      id: 'cultural',
      name: 'Cultural Reference Guide',
      description: 'Local customs, etiquette, and essential phrases',
      icon: Globe,
      pages: '3-5 pages',
      features: ['Cultural dos & donts', 'Essential phrases', 'Tipping guide', 'Local customs']
    }
  ];

  const shareOptions = [
    {
      id: 'link',
      name: 'Shareable Link',
      description: 'Generate a secure link to view your itinerary',
      icon: Link2,
      action: generateShareableLink
    },
    {
      id: 'qr',
      name: 'QR Code',
      description: 'Quick mobile access with QR code',
      icon: QrCode,
      action: generateQRCode
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Send via email with PDF attachment',
      icon: Mail,
      action: shareViaEmail
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Share with travel companions',
      icon: MessageCircle,
      action: shareViaWhatsApp
    },
    {
      id: 'social',
      name: 'Social Media',
      description: 'Share highlights on social platforms',
      icon: Instagram,
      action: shareOnSocial
    }
  ];

  const calendarOptions = [
    {
      id: 'google',
      name: 'Google Calendar',
      description: 'Add all activities to Google Calendar',
      icon: Calendar,
      action: exportToGoogleCalendar
    },
    {
      id: 'outlook',
      name: 'Outlook',
      description: 'Export to Microsoft Outlook',
      icon: Calendar,
      action: exportToOutlook
    },
    {
      id: 'apple',
      name: 'Apple Calendar',
      description: 'Add to iPhone/Mac Calendar',
      icon: Calendar,
      action: exportToAppleCalendar
    },
    {
      id: 'ical',
      name: 'iCal File',
      description: 'Download .ics file for any calendar app',
      icon: Download,
      action: exportToICal
    }
  ];

  // Export Functions
  async function exportPDF() {
    setIsExporting(true);
    setExportProgress(0);

    try {
      const pdfService = new PDFExportService();
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setExportProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const pdfBlob = await pdfService.generatePDF({
        itinerary,
        destination,
        startDate,
        endDate,
        groupSize,
        budget,
        format: exportFormat,
        branding: customBranding
      });

      clearInterval(progressInterval);
      setExportProgress(100);

      // Download the PDF
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${destination.replace(/[^a-z0-9]/gi, '_')}_itinerary_${exportFormat}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 1000);

    } catch (error) {
      console.error('PDF export failed:', error);
      setIsExporting(false);
      setExportProgress(0);
    }
  }

  async function generateShareableLink() {
    try {
      // Generate a secure shareable link
      const linkId = Math.random().toString(36).substring(2, 15);
      const link = `${window.location.origin}/shared/${linkId}`;
      setShareableLink(link);
      
      // Store itinerary data (in real app, this would be sent to backend)
      localStorage.setItem(`shared_${linkId}`, JSON.stringify({
        itinerary,
        destination,
        startDate,
        endDate,
        groupSize,
        budget,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      }));

    } catch (error) {
      console.error('Failed to generate shareable link:', error);
    }
  }

  async function generateQRCode() {
    try {
      if (!shareableLink) {
        await generateShareableLink();
      }
      
      const qrService = new QRCodeService();
      const qrDataUrl = await qrService.generateQR(shareableLink || `${window.location.origin}/trip/${destination}`);
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  }

  async function shareViaEmail() {
    const subject = `Travel Itinerary: ${destination}`;
    const body = `Check out my travel itinerary for ${destination}!\n\nDates: ${startDate} to ${endDate}\nGroup Size: ${groupSize} people\n\nView full itinerary: ${shareableLink || window.location.href}`;
    
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  }

  async function shareViaWhatsApp() {
    const message = `🌍 Check out my travel itinerary for ${destination}!\n\n📅 ${startDate} to ${endDate}\n👥 ${groupSize} travelers\n\n${shareableLink || window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  async function shareOnSocial() {
    const text = `Planning an amazing trip to ${destination}! ${startDate} to ${endDate} 🌍✈️`;
    const url = shareableLink || window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Travel Itinerary: ${destination}`,
          text,
          url
        });
      } catch (error) {
        console.log('Native sharing failed, falling back to manual sharing');
        copyToClipboard(`${text} ${url}`);
      }
    } else {
      copyToClipboard(`${text} ${url}`);
    }
  }

  // Calendar Export Functions
  async function exportToGoogleCalendar() {
    const calendarService = new CalendarExportService();
    const events = calendarService.convertToCalendarEvents(itinerary, destination);
    
    // Create Google Calendar URL
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    events.forEach(event => {
      const params = new URLSearchParams({
        text: event.title,
        dates: `${event.start}/${event.end}`,
        details: event.description,
        location: event.location
      });
      window.open(`${baseUrl}&${params.toString()}`, '_blank');
    });
  }

  async function exportToOutlook() {
    const calendarService = new CalendarExportService();
    const icsContent = calendarService.generateICS(itinerary, destination);
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${destination}_itinerary.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function exportToAppleCalendar() {
    // Same as Outlook - .ics file works for Apple Calendar
    await exportToOutlook();
  }

  async function exportToICal() {
    await exportToOutlook();
  }

  // Cloud Backup Functions
  async function saveToCloud() {
    setBackupStatus('saving');
    
    try {
      const cloudService = new CloudBackupService();
      await cloudService.backup({
        itinerary,
        destination,
        startDate,
        endDate,
        groupSize,
        budget,
        timestamp: new Date().toISOString()
      });
      
      setBackupStatus('success');
      setTimeout(() => setBackupStatus('idle'), 3000);
    } catch (error) {
      console.error('Cloud backup failed:', error);
      setBackupStatus('error');
      setTimeout(() => setBackupStatus('idle'), 3000);
    }
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }

  const handleCustomLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCustomBranding(prev => ({ ...prev, customLogo: file }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Export & Share</h2>
              <p className="text-white/90">Share your {destination} itinerary with the world</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600">
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Export Tab */}
              {activeTab === 'export' && (
                <motion.div
                  key="export"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Choose Export Format
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exportFormats.map((format) => (
                        <div
                          key={format.id}
                          onClick={() => setExportFormat(format.id as any)}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            exportFormat === format.id
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              exportFormat === format.id
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                            }`}>
                              <format.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {format.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                {format.description}
                              </p>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                {format.pages}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {format.features.map((feature, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Branding */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Customization Options
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Include WanderWise Branding
                        </label>
                        <button
                          onClick={() => setCustomBranding(prev => ({ ...prev, includeWatermark: !prev.includeWatermark }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            customBranding.includeWatermark ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              customBranding.includeWatermark ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Custom Title (Optional)
                        </label>
                        <input
                          type="text"
                          value={customBranding.customTitle}
                          onChange={(e) => setCustomBranding(prev => ({ ...prev, customTitle: e.target.value }))}
                          placeholder="My Amazing Trip to..."
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Custom Logo
                        </label>
                        <div className="flex items-center space-x-3">
                          <Button
                            onClick={() => fileInputRef.current?.click()}
                            variant="outline"
                            size="sm"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Logo
                          </Button>
                          {customBranding.customLogo && (
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {customBranding.customLogo.name}
                            </span>
                          )}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleCustomLogoUpload}
                          className="hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Color Scheme
                        </label>
                        <select
                          value={customBranding.colorScheme}
                          onChange={(e) => setCustomBranding(prev => ({ ...prev, colorScheme: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="default">Default (Blue & Orange)</option>
                          <option value="minimal">Minimal (Black & White)</option>
                          <option value="vibrant">Vibrant (Colorful)</option>
                          <option value="elegant">Elegant (Navy & Gold)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Export Button */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <Button
                      onClick={exportPDF}
                      disabled={isExporting}
                      className="w-full"
                      size="lg"
                    >
                      {isExporting ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                          Generating PDF... {exportProgress}%
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Export PDF
                        </>
                      )}
                    </Button>
                    
                    {isExporting && (
                      <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${exportProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Share Tab */}
              {activeTab === 'share' && (
                <motion.div
                  key="share"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Digital Sharing Options
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {shareOptions.map((option) => (
                        <div
                          key={option.id}
                          className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                <option.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {option.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {option.description}
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={option.action}
                              variant="outline"
                              size="sm"
                            >
                              Share
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Generated Links */}
                  {shareableLink && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                        Shareable Link
                      </h4>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <input
                          type="text"
                          value={shareableLink}
                          readOnly
                          className="flex-1 bg-transparent text-gray-900 dark:text-white text-sm focus:outline-none"
                        />
                        <Button
                          onClick={() => copyToClipboard(shareableLink)}
                          variant="outline"
                          size="sm"
                        >
                          {copiedText === shareableLink ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Link expires in 30 days. Anyone with this link can view your itinerary.
                      </p>
                    </div>
                  )}

                  {/* QR Code */}
                  {qrCodeUrl && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                        QR Code for Mobile Access
                      </h4>
                      <div className="flex items-center space-x-6">
                        <img
                          src={qrCodeUrl}
                          alt="QR Code"
                          className="w-32 h-32 border border-gray-200 dark:border-gray-600 rounded-lg"
                        />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Scan this QR code with any smartphone camera to instantly access your itinerary.
                          </p>
                          <Button
                            onClick={() => {
                              const a = document.createElement('a');
                              a.href = qrCodeUrl;
                              a.download = `${destination}_qr_code.png`;
                              a.click();
                            }}
                            variant="outline"
                            size="sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download QR Code
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Calendar Tab */}
              {activeTab === 'calendar' && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Calendar Integration
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Add your itinerary to your calendar app with automatic reminders and notifications.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {calendarOptions.map((option) => (
                        <div
                          key={option.id}
                          className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                              <option.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {option.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {option.description}
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={option.action}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Export to {option.name}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calendar Features */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      What's Included
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            All activities with exact times
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Location details and addresses
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Automatic reminders
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Travel time between activities
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Contact information
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Sync across all devices
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Backup Tab */}
              {activeTab === 'backup' && (
                <motion.div
                  key="backup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Cloud Backup & Sync
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Keep your itinerary safe and accessible across all your devices.
                    </p>
                  </div>

                  {/* Backup Status */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Backup Status
                      </h4>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        backupStatus === 'success' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : backupStatus === 'error'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : backupStatus === 'saving'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                      }`}>
                        {backupStatus === 'success' && 'Backed Up'}
                        {backupStatus === 'error' && 'Backup Failed'}
                        {backupStatus === 'saving' && 'Saving...'}
                        {backupStatus === 'idle' && 'Not Backed Up'}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Last backup:</span>
                        <span className="text-gray-900 dark:text-white">Never</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Storage used:</span>
                        <span className="text-gray-900 dark:text-white">0 MB / 100 MB</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Auto-sync:</span>
                        <span className="text-green-600 dark:text-green-400">Enabled</span>
                      </div>
                    </div>

                    <Button
                      onClick={saveToCloud}
                      disabled={backupStatus === 'saving'}
                      className="w-full mt-4"
                    >
                      {backupStatus === 'saving' ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Backing Up...
                        </>
                      ) : (
                        <>
                          <Cloud className="w-4 h-4 mr-2" />
                          Backup Now
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Backup Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Backup Features
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <Cloud className="w-5 h-5 text-blue-500" />
                          <h5 className="font-medium text-gray-900 dark:text-white">
                            Automatic Sync
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Changes are automatically saved and synced across all your devices.
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <Clock className="w-5 h-5 text-green-500" />
                          <h5 className="font-medium text-gray-900 dark:text-white">
                            Version History
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Access previous versions of your itinerary and restore if needed.
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <Users className="w-5 h-5 text-purple-500" />
                          <h5 className="font-medium text-gray-900 dark:text-white">
                            Team Collaboration
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Share with travel companions and collaborate in real-time.
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <Smartphone className="w-5 h-5 text-orange-500" />
                          <h5 className="font-medium text-gray-900 dark:text-white">
                            Offline Access
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Download for offline access when you're traveling without internet.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Storage Management */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Storage Management
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Current Plan: Free (100 MB)
                        </span>
                        <Button variant="outline" size="sm">
                          Upgrade
                        </Button>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }} />
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>15 MB used</span>
                        <span>85 MB available</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}