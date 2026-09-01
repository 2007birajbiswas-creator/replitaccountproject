export type JourneyPlace = {
  name: string;
  coordinates: [number, number];
  role: 'hometown' | 'current' | 'travel';
};

export const journeyPlaces: JourneyPlace[] = [
  { name: 'Mumbai', coordinates: [19.076, 72.8777], role: 'hometown' },
  { name: 'Surat', coordinates: [21.1702, 72.8311], role: 'travel' },
  { name: 'Ahmedabad', coordinates: [23.0225, 72.5714], role: 'travel' },
  { name: 'Rajasthan', coordinates: [27.0238, 74.2179], role: 'travel' },
  { name: 'Delhi', coordinates: [28.6139, 77.209], role: 'travel' },
  { name: 'Punjab', coordinates: [31.1471, 75.3412], role: 'travel' },
  { name: 'Himachal Pradesh', coordinates: [31.1048, 77.1734], role: 'travel' },
  { name: 'Uttarakhand', coordinates: [30.0668, 79.0193], role: 'travel' },
  { name: 'Lucknow', coordinates: [26.8467, 80.9462], role: 'travel' },
  { name: 'Varanasi', coordinates: [25.3176, 82.9739], role: 'travel' },
  { name: 'Madhya Pradesh', coordinates: [22.9734, 78.6569], role: 'travel' },
  { name: 'Kolkata', coordinates: [22.5726, 88.3639], role: 'current' },
  { name: 'Odisha', coordinates: [20.9517, 85.0985], role: 'travel' },
  { name: 'Sikkim', coordinates: [27.533, 88.512], role: 'travel' },
  { name: 'Assam', coordinates: [26.2006, 92.9376], role: 'travel' },
  { name: 'Meghalaya', coordinates: [25.467, 91.3662], role: 'travel' },
  { name: 'Tripura', coordinates: [23.9408, 91.9882], role: 'travel' },
  { name: 'Manipur', coordinates: [24.6637, 93.9063], role: 'travel' },
  { name: 'Mizoram', coordinates: [23.1645, 92.9376], role: 'travel' },
  { name: 'Andhra Pradesh', coordinates: [15.9129, 79.74], role: 'travel' },
  { name: 'Bengaluru', coordinates: [12.9716, 77.5946], role: 'travel' },
  { name: 'Tamil Nadu', coordinates: [11.1271, 78.6569], role: 'travel' },
  { name: 'Chennai', coordinates: [13.0827, 80.2707], role: 'travel' },
  { name: 'Kathmandu', coordinates: [27.7172, 85.324], role: 'travel' },
  { name: 'Bhutan', coordinates: [27.5142, 90.4336], role: 'travel' },
];