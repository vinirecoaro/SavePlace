export default class Localization {
    name: string;
    latitude: string;
    longitude: string;
    pinColor: string;
  
    constructor(name: string, latitude: string, longitude: string, pinColor: string) {
      this.name = name;
      this.latitude = latitude;
      this.longitude = longitude;
      this.pinColor = pinColor;
    }
  
    getLocationDescription(): string {
      return `${this.name}: Latitude ${this.latitude}, Longitude ${this.longitude}, Cor do Marcador ${this.pinColor}`;
    }
  }
  
  