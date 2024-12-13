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
  
export function calculateDistanceBetweenLocalizations(loc1 : Localization, loc2 : Localization){
  const R = 6371; // Raio da Terra em quilômetros

  const lat1 = parseFloat(loc1.latitude)
  const lon1 = parseFloat(loc1.longitude)
  const lat2 = parseFloat(loc2.latitude)
  const lon2 = parseFloat(loc2.longitude)

  // Converter graus para radianos
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  // Diferenças das coordenadas
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  // Fórmula de Haversine
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distância final em km
  return R * c;
}