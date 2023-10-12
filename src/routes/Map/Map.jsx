import { MapContainer, TileLayer, useMap, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Container, Button } from '@mui/material';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { useTheme } from '@emotion/react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Map = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const bounds = [
    [36.8, -102], // Southwest coordinates
    [41.5, -109]  // Northeast coordinates
  ];

  const basemap = useMemo(() => {
    return theme.palette.mode === 'dark'
      ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}'
      : 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}';
  }, [theme.palette.mode]);
  


  return (
      <>
        <MapContainer center={[39.7392, -104.9903]} zoom={10} scrollWheelZoom={false} maxBounds={bounds} maxBoundsViscosity={1.0} zoomControl={false}>
          <TileLayer
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={basemap}
            ext="png"
          />
          <ZoomControl position="bottomright" />
        </MapContainer>
        <Container className="map-nav">
          <Button variant="contained" onClick={() => navigate("/browser")}>
            <ArrowBackIcon sx={{mr: 1}}/>
            Back to Browser View
          </Button>
        </Container>
      </>
  )
}

export default Map;