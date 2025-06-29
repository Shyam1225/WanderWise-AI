interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  description: string;
  location: string;
}

export class CalendarExportService {
  convertToCalendarEvents(itinerary: any, destination: string): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    
    // Mock conversion - in real implementation, parse actual itinerary data
    const activities = [
      {
        title: 'Morning Exploration',
        start: '2024-03-15T09:00:00',
        end: '2024-03-15T12:00:00',
        description: 'Explore the historic city center and main attractions',
        location: `${destination} City Center`
      },
      {
        title: 'Lunch at Local Restaurant',
        start: '2024-03-15T13:00:00',
        end: '2024-03-15T14:30:00',
        description: 'Experience authentic local cuisine',
        location: `Traditional Restaurant, ${destination}`
      },
      {
        title: 'Cultural Site Visit',
        start: '2024-03-15T15:00:00',
        end: '2024-03-15T17:00:00',
        description: 'Visit museums and cultural landmarks',
        location: `Museum Quarter, ${destination}`
      }
    ];

    return activities;
  }

  generateICS(itinerary: any, destination: string): string {
    const events = this.convertToCalendarEvents(itinerary, destination);
    
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//WanderWise AI//Travel Itinerary//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    events.forEach((event, index) => {
      const uid = `${Date.now()}-${index}@wanderwise.ai`;
      const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const dtStart = event.start.replace(/[-:]/g, '').split('.')[0] + 'Z';
      const dtEnd = event.end.replace(/[-:]/g, '').split('.')[0] + 'Z';

      icsContent.push(
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dtStamp}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        'END:VEVENT'
      );
    });

    icsContent.push('END:VCALENDAR');
    
    return icsContent.join('\r\n');
  }

  async exportToGoogleCalendar(events: CalendarEvent[]) {
    // Generate Google Calendar URLs for each event
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    
    events.forEach(event => {
      const params = new URLSearchParams({
        text: event.title,
        dates: `${event.start.replace(/[-:]/g, '').split('.')[0]}Z/${event.end.replace(/[-:]/g, '').split('.')[0]}Z`,
        details: event.description,
        location: event.location
      });
      
      window.open(`${baseUrl}&${params.toString()}`, '_blank');
    });
  }
}