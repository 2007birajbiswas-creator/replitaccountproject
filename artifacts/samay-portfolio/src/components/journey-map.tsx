import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import {
  CircleMarker,
  MapContainer,
  Polyline,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import type { LatLngExpression, PathOptions } from 'leaflet';
import { journeyPlaces, type JourneyPlace } from '../data/journey-places';
import 'leaflet/dist/leaflet.css';

const routeCoordinates: LatLngExpression[] = [
  journeyPlaces[0].coordinates,
  journeyPlaces[1].coordinates,
  journeyPlaces[2].coordinates,
  journeyPlaces[3].coordinates,
  journeyPlaces[4].coordinates,
  journeyPlaces[5].coordinates,
  journeyPlaces[6].coordinates,
  journeyPlaces[7].coordinates,
  journeyPlaces[8].coordinates,
  journeyPlaces[9].coordinates,
  journeyPlaces[10].coordinates,
  journeyPlaces[11].coordinates,
  journeyPlaces[12].coordinates,
  journeyPlaces[13].coordinates,
  journeyPlaces[14].coordinates,
  journeyPlaces[15].coordinates,
  journeyPlaces[16].coordinates,
  journeyPlaces[17].coordinates,
  journeyPlaces[18].coordinates,
  journeyPlaces[19].coordinates,
  journeyPlaces[20].coordinates,
  journeyPlaces[21].coordinates,
  journeyPlaces[22].coordinates,
  journeyPlaces[23].coordinates,
  journeyPlaces[24].coordinates,
];

function MapFocus({ selected }: { selected: JourneyPlace | null }) {
  const map = useMap();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!selected) return;
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    map.flyTo(selected.coordinates, Math.max(map.getZoom(), 5.7), {
      animate: true,
      duration: 0.8,
    });
  }, [map, selected]);

  return null;
}

function markerPathOptions(place: JourneyPlace, index: number, isSelected: boolean): PathOptions & CSSProperties & Record<'--marker-delay', string> {
  const color =
    place.role === 'hometown'
      ? '#a6322e'
      : place.role === 'current'
        ? '#487352'
        : '#877e75';
  return {
    className: `travel-marker travel-marker-${place.role}${isSelected ? ' travel-marker-selected' : ''}`,
    color,
    fillColor: color,
    fillOpacity: place.role === 'travel' ? 0.82 : 1,
    opacity: 0.95,
    weight: place.role === 'travel' ? 1 : 1.4,
    '--marker-delay': `${index * 35}ms`,
  };
}

export default function JourneyMap({
  selected,
  onSelect,
}: {
  selected: JourneyPlace | null;
  onSelect: (place: JourneyPlace) => void;
}) {
  return (
    <div className="travel-map-frame" data-testid="map-journey">
      <MapContainer
        center={[23.5, 82] as LatLngExpression}
        zoom={5}
        minZoom={4}
        maxZoom={9}
        scrollWheelZoom
        zoomControl={false}
        maxBounds={[[5, 60], [38, 101]]}
        maxBoundsViscosity={0.7}
        className="travel-map"
        aria-label="Interactive map of selected locations from Samay Mishra's journey"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <Polyline
          positions={routeCoordinates}
          pathOptions={{
            className: 'travel-route',
            color: '#93725f',
            dashArray: '5 8',
            opacity: 0.7,
            weight: 1.2,
          }}
        />
        {journeyPlaces.map((place, index) => (
          <CircleMarker
            key={place.name}
            center={place.coordinates}
            radius={place.role === 'travel' ? 4 : 6}
            pathOptions={markerPathOptions(place, index, selected?.name === place.name)}
            eventHandlers={{ click: () => onSelect(place) }}
          >
            <Tooltip
              direction="top"
              offset={[0, -5]}
              opacity={1}
              permanent={place.role !== 'travel' || selected?.name === place.name}
            >
              <span className="travel-tooltip">
                {place.name}
                {place.role === 'hometown' ? ' / Hometown' : ''}
                {place.role === 'current' ? ' / Current base' : ''}
              </span>
            </Tooltip>
          </CircleMarker>
        ))}
        <MapFocus selected={selected} />
      </MapContainer>
    </div>
  );
}
