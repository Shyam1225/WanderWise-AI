// Type definitions for Google Maps JavaScript API
declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      setMapTypeId(mapTypeId: string): void;
      getCenter(): LatLng;
      getZoom(): number;
    }

    class StreetViewPanorama {
      constructor(container: Element, opts?: StreetViewPanoramaOptions);
      getPosition(): LatLng | null;
      getPov(): StreetViewPov;
      getZoom(): number;
      setPosition(latLng: LatLng | LatLngLiteral): void;
      setPov(pov: StreetViewPov): void;
      setZoom(zoom: number): void;
      setVisible(flag: boolean): void;
    }

    class StreetViewService {
      constructor();
      getPanorama(request: StreetViewLocationRequest | StreetViewPanoRequest, callback: (data: StreetViewPanoramaData | null, status: StreetViewStatus) => void): void;
    }

    class LatLng {
      constructor(lat: number, lng: number, noWrap?: boolean);
      lat(): number;
      lng(): number;
      toString(): string;
      toUrlValue(precision?: number): string;
      toJSON(): LatLngLiteral;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface StreetViewPov {
      heading: number;
      pitch: number;
    }

    interface StreetViewLocationRequest {
      location: LatLng | LatLngLiteral;
      radius?: number;
      source?: StreetViewSource;
      preference?: StreetViewPreference;
    }

    interface StreetViewPanoRequest {
      pano: string;
    }

    interface StreetViewPanoramaData {
      copyright: string;
      imageDate: string;
      links: StreetViewLink[];
      location: StreetViewLocation;
      pano: string;
    }

    interface StreetViewLink {
      description: string;
      heading: number;
      pano: string;
    }

    interface StreetViewLocation {
      description: string;
      latLng: LatLng;
      pano: string;
      shortDescription: string;
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
    }

    interface StreetViewPanoramaOptions {
      position?: LatLng | LatLngLiteral;
      pov?: StreetViewPov;
      zoom?: number;
      visible?: boolean;
      addressControl?: boolean;
      showRoadLabels?: boolean;
      linksControl?: boolean;
      panControl?: boolean;
      enableCloseButton?: boolean;
    }

    type StreetViewStatus = 'OK' | 'UNKNOWN_ERROR' | 'ZERO_RESULTS' | 'INVALID_REQUEST';
    type StreetViewSource = 'default' | 'outdoor';
    type StreetViewPreference = 'nearest' | 'best';
  }
}

export {};