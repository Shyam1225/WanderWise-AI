import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFExportOptions {
  itinerary: any;
  destination: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  budget: number;
  format: 'detailed' | 'compact' | 'emergency' | 'cultural';
  branding: {
    includeWatermark: boolean;
    customTitle: string;
    customLogo: File | null;
    colorScheme: string;
  };
}

export class PDFExportService {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;
  private currentY: number;

  constructor() {
    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
  }

  async generatePDF(options: PDFExportOptions): Promise<Blob> {
    try {
      this.doc = new jsPDF();
      this.currentY = this.margin;

      // Set color scheme
      const colors = this.getColorScheme(options.branding.colorScheme);

      switch (options.format) {
        case 'detailed':
          await this.generateDetailedItinerary(options, colors);
          break;
        case 'compact':
          await this.generateCompactGuide(options, colors);
          break;
        case 'emergency':
          await this.generateEmergencySheet(options, colors);
          break;
        case 'cultural':
          await this.generateCulturalGuide(options, colors);
          break;
      }

      // Add watermark if enabled
      if (options.branding.includeWatermark) {
        this.addWatermark();
      }

      return this.doc.output('blob');
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error('Failed to generate PDF. Please try again.');
    }
  }

  private getColorScheme(scheme: string) {
    switch (scheme) {
      case 'minimal':
        return { primary: [0, 0, 0], secondary: [128, 128, 128], accent: [200, 200, 200] };
      case 'vibrant':
        return { primary: [255, 107, 53], secondary: [52, 152, 219], accent: [155, 89, 182] };
      case 'elegant':
        return { primary: [44, 62, 80], secondary: [241, 196, 15], accent: [149, 165, 166] };
      default:
        return { primary: [59, 130, 246], secondary: [249, 115, 22], accent: [107, 114, 128] };
    }
  }

  private async generateDetailedItinerary(options: PDFExportOptions, colors: any) {
    // Cover Page
    this.addCoverPage(options, colors);
    this.addNewPage();

    // Table of Contents
    this.addTableOfContents(options);
    this.addNewPage();

    // Trip Overview
    this.addTripOverview(options, colors);
    this.addNewPage();

    // Daily Itinerary
    this.addDailyItinerary(options, colors);

    // Restaurant Guide
    this.addRestaurantGuide(options, colors);

    // Transportation Guide
    this.addTransportationGuide(options, colors);

    // Cultural Tips
    this.addCulturalTips(options, colors);

    // Emergency Information
    this.addEmergencyInfo(options, colors);
  }

  private async generateCompactGuide(options: PDFExportOptions, colors: any) {
    // Compact header
    this.addCompactHeader(options, colors);
    
    // Essential information only
    this.addEssentialActivities(options, colors);
    this.addQuickReference(options, colors);
    this.addEmergencyContacts(options, colors);
  }

  private async generateEmergencySheet(options: PDFExportOptions, colors: any) {
    this.addEmergencyHeader(options, colors);
    this.addEmergencyContacts(options, colors);
    this.addMedicalInfo(options, colors);
    this.addEmbassyInfo(options, colors);
    this.addInsuranceInfo(options, colors);
  }

  private async generateCulturalGuide(options: PDFExportOptions, colors: any) {
    this.addCulturalHeader(options, colors);
    this.addCulturalDosAndDonts(options, colors);
    this.addEssentialPhrases(options, colors);
    this.addTippingGuide(options, colors);
    this.addLocalCustoms(options, colors);
  }

  private addCoverPage(options: PDFExportOptions, colors: any) {
    // Background gradient effect
    this.doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    this.doc.rect(0, 0, this.pageWidth, this.pageHeight / 3, 'F');

    // Title
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(28);
    this.doc.setFont('helvetica', 'bold');
    const title = options.branding.customTitle || `Travel Itinerary: ${options.destination}`;
    this.doc.text(title, this.pageWidth / 2, 60, { align: 'center' });

    // Subtitle
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`${options.startDate} to ${options.endDate}`, this.pageWidth / 2, 80, { align: 'center' });
    this.doc.text(`${options.groupSize} ${options.groupSize === 1 ? 'Traveler' : 'Travelers'}`, this.pageWidth / 2, 95, { align: 'center' });

    // Trip details box
    this.doc.setFillColor(255, 255, 255);
    this.doc.roundedRect(this.margin, 120, this.pageWidth - 2 * this.margin, 80, 5, 5, 'F');
    
    this.doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Trip Summary', this.margin + 10, 140);

    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`Destination: ${options.destination}`, this.margin + 10, 155);
    this.doc.text(`Duration: ${this.calculateDuration(options.startDate, options.endDate)} days`, this.margin + 10, 170);
    this.doc.text(`Budget: $${options.budget} per person per day`, this.margin + 10, 185);

    // Generated date
    this.doc.setTextColor(128, 128, 128);
    this.doc.setFontSize(10);
    this.doc.text(`Generated on ${new Date().toLocaleDateString()}`, this.pageWidth / 2, this.pageHeight - 30, { align: 'center' });
  }

  private addTableOfContents(options: PDFExportOptions) {
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Table of Contents', this.margin, this.currentY);
    this.currentY += 20;

    const contents = [
      'Trip Overview',
      'Daily Itinerary',
      'Restaurant Recommendations',
      'Transportation Guide',
      'Cultural Tips & Etiquette',
      'Emergency Information'
    ];

    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    
    contents.forEach((item, index) => {
      this.doc.text(`${index + 1}. ${item}`, this.margin + 10, this.currentY);
      this.doc.text(`${index + 3}`, this.pageWidth - this.margin - 10, this.currentY, { align: 'right' });
      this.currentY += 15;
    });
  }

  private addTripOverview(options: PDFExportOptions, colors: any) {
    this.addSectionHeader('Trip Overview', colors);
    
    // Trip details in a structured format
    const details = [
      ['Destination', options.destination],
      ['Travel Dates', `${options.startDate} to ${options.endDate}`],
      ['Duration', `${this.calculateDuration(options.startDate, options.endDate)} days`],
      ['Group Size', `${options.groupSize} ${options.groupSize === 1 ? 'person' : 'people'}`],
      ['Daily Budget', `$${options.budget} per person`],
      ['Total Budget', `$${options.budget * options.groupSize * this.calculateDuration(options.startDate, options.endDate)}`]
    ];

    details.forEach(([label, value]) => {
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(`${label}:`, this.margin, this.currentY);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(value, this.margin + 60, this.currentY);
      this.currentY += 12;
    });

    this.currentY += 10;

    // Trip highlights
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Trip Highlights:', this.margin, this.currentY);
    this.currentY += 15;

    const highlights = [
      'Explore historic landmarks and cultural sites',
      'Experience authentic local cuisine',
      'Discover hidden gems off the beaten path',
      'Immerse in local traditions and customs'
    ];

    this.doc.setFont('helvetica', 'normal');
    highlights.forEach(highlight => {
      this.doc.text(`• ${highlight}`, this.margin + 10, this.currentY);
      this.currentY += 12;
    });
  }

  private addDailyItinerary(options: PDFExportOptions, colors: any) {
    this.addSectionHeader('Daily Itinerary', colors);

    // Mock daily activities (in real implementation, use actual itinerary data)
    const days = this.calculateDuration(options.startDate, options.endDate);
    
    for (let day = 1; day <= days; day++) {
      if (this.currentY > this.pageHeight - 60) {
        this.addNewPage();
      }

      // Day header
      this.doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      this.doc.rect(this.margin, this.currentY - 5, this.pageWidth - 2 * this.margin, 20, 'F');
      
      this.doc.setTextColor(255, 255, 255);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(`Day ${day}`, this.margin + 5, this.currentY + 8);
      
      const dayDate = new Date(options.startDate);
      dayDate.setDate(dayDate.getDate() + day - 1);
      this.doc.text(dayDate.toLocaleDateString(), this.pageWidth - this.margin - 5, this.currentY + 8, { align: 'right' });
      
      this.currentY += 25;
      this.doc.setTextColor(0, 0, 0);

      // Activities for the day
      const activities = [
        { time: '9:00 AM', title: 'Morning Exploration', location: 'City Center', duration: '3 hours' },
        { time: '1:00 PM', title: 'Lunch at Local Restaurant', location: 'Historic District', duration: '1.5 hours' },
        { time: '3:00 PM', title: 'Cultural Site Visit', location: 'Museum Quarter', duration: '2 hours' },
        { time: '7:00 PM', title: 'Dinner & Evening Stroll', location: 'Waterfront', duration: '2 hours' }
      ];

      activities.forEach(activity => {
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(activity.time, this.margin + 5, this.currentY);
        this.doc.text(activity.title, this.margin + 35, this.currentY);
        
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(10);
        this.doc.text(`📍 ${activity.location} • ⏱️ ${activity.duration}`, this.margin + 35, this.currentY + 8);
        
        this.doc.setFontSize(12);
        this.currentY += 20;
      });

      this.currentY += 10;
    }
  }

  private addRestaurantGuide(options: PDFExportOptions, colors: any) {
    this.addNewPage();
    this.addSectionHeader('Restaurant Recommendations', colors);

    const restaurants = [
      {
        name: 'Local Favorite Bistro',
        cuisine: 'Traditional',
        priceRange: '$$',
        rating: '4.5/5',
        description: 'Authentic local cuisine in a charming traditional setting.',
        mustTry: 'Signature local dish, Traditional dessert'
      },
      {
        name: 'Street Food Market',
        cuisine: 'Various',
        priceRange: '$',
        rating: '4.3/5',
        description: 'Vibrant market with diverse local street food options.',
        mustTry: 'Local snacks, Fresh fruit juices'
      }
    ];

    restaurants.forEach(restaurant => {
      if (this.currentY > this.pageHeight - 80) {
        this.addNewPage();
      }

      this.doc.setFont('helvetica', 'bold');
      this.doc.setFontSize(14);
      this.doc.text(restaurant.name, this.margin, this.currentY);
      
      this.doc.setFontSize(12);
      this.doc.text(`${restaurant.cuisine} • ${restaurant.priceRange} • ⭐ ${restaurant.rating}`, this.margin, this.currentY + 12);
      
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(10);
      const descLines = this.doc.splitTextToSize(restaurant.description, this.pageWidth - 2 * this.margin);
      this.doc.text(descLines, this.margin, this.currentY + 24);
      
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Must Try:', this.margin, this.currentY + 36);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(restaurant.mustTry, this.margin + 30, this.currentY + 36);
      
      this.currentY += 55;
    });
  }

  private addTransportationGuide(options: PDFExportOptions, colors: any) {
    this.addNewPage();
    this.addSectionHeader('Transportation Guide', colors);

    const transportOptions = [
      {
        type: 'Public Transport',
        cost: '$2-5 per ride',
        pros: 'Affordable, extensive network',
        cons: 'Can be crowded during peak hours',
        tips: 'Buy a day pass for multiple rides'
      },
      {
        type: 'Taxi/Rideshare',
        cost: '$10-25 per ride',
        pros: 'Convenient, door-to-door service',
        cons: 'More expensive, traffic dependent',
        tips: 'Use official apps for better rates'
      }
    ];

    transportOptions.forEach(option => {
      this.doc.setFont('helvetica', 'bold');
      this.doc.setFontSize(14);
      this.doc.text(option.type, this.margin, this.currentY);
      
      this.doc.setFontSize(12);
      this.doc.text(`Cost: ${option.cost}`, this.margin, this.currentY + 15);
      
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(10);
      this.doc.text(`✅ Pros: ${option.pros}`, this.margin, this.currentY + 27);
      this.doc.text(`❌ Cons: ${option.cons}`, this.margin, this.currentY + 39);
      this.doc.text(`💡 Tips: ${option.tips}`, this.margin, this.currentY + 51);
      
      this.currentY += 70;
    });
  }

  private addCulturalTips(options: PDFExportOptions, colors: any) {
    this.addNewPage();
    this.addSectionHeader('Cultural Tips & Etiquette', colors);

    const sections = [
      {
        title: 'Do\'s',
        items: [
          'Greet people with respect and appropriate gestures',
          'Dress modestly when visiting religious sites',
          'Learn basic phrases in the local language',
          'Respect local customs and traditions'
        ]
      },
      {
        title: 'Don\'ts',
        items: [
          'Point with your index finger at people',
          'Show the soles of your feet in temples',
          'Refuse offered food or drink rudely',
          'Take photos without permission'
        ]
      }
    ];

    sections.forEach(section => {
      this.doc.setFont('helvetica', 'bold');
      this.doc.setFontSize(14);
      this.doc.text(section.title, this.margin, this.currentY);
      this.currentY += 15;

      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(10);
      section.items.forEach(item => {
        this.doc.text(`• ${item}`, this.margin + 10, this.currentY);
        this.currentY += 12;
      });
      this.currentY += 10;
    });
  }

  private addEmergencyInfo(options: PDFExportOptions, colors: any) {
    this.addNewPage();
    this.addSectionHeader('Emergency Information', colors);

    const emergencyContacts = [
      { service: 'Police', number: '100', notes: 'National emergency number' },
      { service: 'Medical Emergency', number: '102', notes: 'Ambulance services' },
      { service: 'Fire Department', number: '101', notes: 'Fire and rescue services' },
      { service: 'Tourist Helpline', number: '1363', notes: '24/7 multilingual support' }
    ];

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12);
    this.doc.text('Emergency Contact Numbers', this.margin, this.currentY);
    this.currentY += 20;

    emergencyContacts.forEach(contact => {
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(contact.service, this.margin, this.currentY);
      this.doc.text(contact.number, this.margin + 80, this.currentY);
      
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(10);
      this.doc.text(contact.notes, this.margin, this.currentY + 10);
      
      this.doc.setFontSize(12);
      this.currentY += 25;
    });
  }

  private addCompactHeader(options: PDFExportOptions, colors: any) {
    this.doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    this.doc.rect(0, 0, this.pageWidth, 40, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`${options.destination} Quick Guide`, this.pageWidth / 2, 25, { align: 'center' });
    
    this.currentY = 50;
  }

  private addEssentialActivities(options: PDFExportOptions, colors: any) {
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(14);
    this.doc.text('Essential Activities', this.margin, this.currentY);
    this.currentY += 20;

    const activities = [
      'Historic City Center Tour',
      'Local Market Visit',
      'Traditional Restaurant Experience',
      'Cultural Museum',
      'Scenic Viewpoint'
    ];

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    activities.forEach(activity => {
      this.doc.text(`• ${activity}`, this.margin + 5, this.currentY);
      this.currentY += 12;
    });
  }

  private addQuickReference(options: PDFExportOptions, colors: any) {
    this.currentY += 10;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(14);
    this.doc.text('Quick Reference', this.margin, this.currentY);
    this.currentY += 20;

    const quickInfo = [
      ['Currency', 'Local Currency (LC)'],
      ['Tipping', '10-15% at restaurants'],
      ['Emergency', '100 (Police), 102 (Medical)'],
      ['Language', 'English widely spoken'],
      ['Best Transport', 'Public transport + walking']
    ];

    this.doc.setFontSize(10);
    quickInfo.forEach(([label, info]) => {
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(`${label}:`, this.margin, this.currentY);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(info, this.margin + 40, this.currentY);
      this.currentY += 12;
    });
  }

  private addEmergencyHeader(options: PDFExportOptions, colors: any) {
    this.doc.setFillColor(220, 53, 69); // Red color for emergency
    this.doc.rect(0, 0, this.pageWidth, 50, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('EMERGENCY CONTACT SHEET', this.pageWidth / 2, 30, { align: 'center' });
    
    this.currentY = 60;
  }

  private addEmergencyContacts(options: PDFExportOptions, colors: any) {
    const contacts = [
      { service: 'Police', number: '100' },
      { service: 'Medical Emergency', number: '102' },
      { service: 'Fire Department', number: '101' },
      { service: 'Tourist Helpline', number: '1363' }
    ];

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(16);
    this.doc.text('Emergency Numbers', this.margin, this.currentY);
    this.currentY += 20;

    contacts.forEach(contact => {
      this.doc.setFontSize(14);
      this.doc.text(contact.service, this.margin, this.currentY);
      this.doc.setFontSize(18);
      this.doc.text(contact.number, this.pageWidth - this.margin - 30, this.currentY, { align: 'right' });
      this.currentY += 20;
    });
  }

  private addMedicalInfo(options: PDFExportOptions, colors: any) {
    this.currentY += 20;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(16);
    this.doc.text('Medical Information', this.margin, this.currentY);
    this.currentY += 20;

    const medicalInfo = [
      'Blood Type: ___________',
      'Allergies: ___________',
      'Medications: ___________',
      'Medical Conditions: ___________',
      'Emergency Contact: ___________'
    ];

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(12);
    medicalInfo.forEach(info => {
      this.doc.text(info, this.margin, this.currentY);
      this.currentY += 20;
    });
  }

  private addEmbassyInfo(options: PDFExportOptions, colors: any) {
    this.currentY += 20;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(16);
    this.doc.text('Embassy Information', this.margin, this.currentY);
    this.currentY += 20;

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(12);
    this.doc.text('Address: Embassy Address Here', this.margin, this.currentY);
    this.currentY += 15;
    this.doc.text('Phone: +XX-XX-XXXX-XXXX', this.margin, this.currentY);
    this.currentY += 15;
    this.doc.text('Email: embassy@email.com', this.margin, this.currentY);
  }

  private addInsuranceInfo(options: PDFExportOptions, colors: any) {
    this.currentY += 30;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(16);
    this.doc.text('Travel Insurance', this.margin, this.currentY);
    this.currentY += 20;

    const insuranceFields = [
      'Policy Number: ___________',
      'Provider: ___________',
      'Emergency Number: ___________',
      'Coverage Details: ___________'
    ];

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(12);
    insuranceFields.forEach(field => {
      this.doc.text(field, this.margin, this.currentY);
      this.currentY += 20;
    });
  }

  private addCulturalHeader(options: PDFExportOptions, colors: any) {
    this.doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    this.doc.rect(0, 0, this.pageWidth, 40, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`Cultural Guide: ${options.destination}`, this.pageWidth / 2, 25, { align: 'center' });
    
    this.currentY = 50;
  }

  private addCulturalDosAndDonts(options: PDFExportOptions, colors: any) {
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(16);
    this.doc.text('Cultural Do\'s and Don\'ts', this.margin, this.currentY);
    this.currentY += 20;

    // Do's
    this.doc.setFontSize(14);
    this.doc.setTextColor(0, 128, 0);
    this.doc.text('✓ DO:', this.margin, this.currentY);
    this.currentY += 15;

    const dos = [
      'Greet people respectfully',
      'Dress modestly in religious sites',
      'Learn basic local phrases',
      'Respect local customs'
    ];

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(12);
    dos.forEach(item => {
      this.doc.text(`• ${item}`, this.margin + 10, this.currentY);
      this.currentY += 12;
    });

    this.currentY += 10;

    // Don'ts
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(14);
    this.doc.setTextColor(220, 53, 69);
    this.doc.text('✗ DON\'T:', this.margin, this.currentY);
    this.currentY += 15;

    const donts = [
      'Point with your finger',
      'Show soles of feet',
      'Refuse offered hospitality',
      'Take photos without asking'
    ];

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(12);
    donts.forEach(item => {
      this.doc.text(`• ${item}`, this.margin + 10, this.currentY);
      this.currentY += 12;
    });
  }

  private addEssentialPhrases(options: PDFExportOptions, colors: any) {
    this.currentY += 20;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(16);
    this.doc.text('Essential Phrases', this.margin, this.currentY);
    this.currentY += 20;

    const phrases = [
      ['Hello', 'Local greeting', 'pronunciation'],
      ['Thank you', 'Local thanks', 'pronunciation'],
      ['Please', 'Local please', 'pronunciation'],
      ['Excuse me', 'Local excuse me', 'pronunciation'],
      ['How much?', 'Local price question', 'pronunciation']
    ];

    phrases.forEach(([english, local, pronunciation]) => {
      this.doc.setFont('helvetica', 'bold');
      this.doc.setFontSize(12);
      this.doc.text(english, this.margin, this.currentY);
      
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(local, this.margin + 60, this.currentY);
      this.doc.setFontSize(10);
      this.doc.text(`(${pronunciation})`, this.margin + 60, this.currentY + 10);
      
      this.doc.setFontSize(12);
      this.currentY += 25;
    });
  }

  private addTippingGuide(options: PDFExportOptions, colors: any) {
    this.currentY += 20;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(16);
    this.doc.text('Tipping Guide', this.margin, this.currentY);
    this.currentY += 20;

    const tipping = [
      ['Restaurants', '10-15%'],
      ['Taxis', 'Round up'],
      ['Hotels', '$1-2 per service'],
      ['Tour guides', '$5-10 per day']
    ];

    tipping.forEach(([service, amount]) => {
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(12);
      this.doc.text(service, this.margin, this.currentY);
      this.doc.text(amount, this.margin + 80, this.currentY);
      this.currentY += 15;
    });
  }

  private addLocalCustoms(options: PDFExportOptions, colors: any) {
    this.currentY += 20;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(16);
    this.doc.text('Local Customs', this.margin, this.currentY);
    this.currentY += 20;

    const customs = [
      'Business hours: 9 AM - 6 PM',
      'Lunch break: 12 PM - 2 PM',
      'Weekend: Saturday-Sunday',
      'Religious observances: Fridays'
    ];

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(12);
    customs.forEach(custom => {
      this.doc.text(`• ${custom}`, this.margin, this.currentY);
      this.currentY += 15;
    });
  }

  private addSectionHeader(title: string, colors: any) {
    this.doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    this.doc.rect(this.margin, this.currentY - 5, this.pageWidth - 2 * this.margin, 20, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin + 5, this.currentY + 8);
    
    this.currentY += 25;
    this.doc.setTextColor(0, 0, 0);
  }

  private addNewPage() {
    this.doc.addPage();
    this.currentY = this.margin;
  }

  private addWatermark() {
    const pageCount = this.doc.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      this.doc.setTextColor(200, 200, 200);
      this.doc.setFontSize(8);
      this.doc.text('Generated by WanderWise AI', this.pageWidth - this.margin, this.pageHeight - 10, { align: 'right' });
    }
  }

  private calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}