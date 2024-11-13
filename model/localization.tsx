export default class Localization {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
    pinColor: string;
  
    constructor(id: string, name: string, latitude: string, longitude: string, pinColor: string) {
      this.id = id;
      this.name = name;
      this.latitude = latitude;
      this.longitude = longitude;
      this.pinColor = pinColor;
    }
  
    getLocationDescription(): string {
      return `${this.name}: Latitude ${this.latitude}, Longitude ${this.longitude}, Cor do Marcador ${this.pinColor}`;
    }
  }
  
  