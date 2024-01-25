import React, { useContext, useEffect } from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import { UserLocationContext } from '@/app/context/UserLocationContext'
import Markers from './Markers'

function GoogleMapView({ businessList }) {
  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const containerStyle = {
    width: '100%',
    height: '70vh'
  }

  const defaultCordinate = { lat: 45.7564, lng: 21.2287 }

  // Aici puteți adăuga logica pentru a încerca să obțineți locația utilizatorului
  // și dacă aceasta eșuează, să folosiți coordonatele implicite
  useEffect(() => {
    if (!userLocation.lat || !userLocation.lng) {
      setUserLocation(defaultCordinate);
    }
  }, [userLocation, setUserLocation]);

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        mapIds={['62253722bdafca63']}>
        <GoogleMap mapContainerStyle={containerStyle}
          center={userLocation.lat && userLocation.lng ? userLocation : defaultCordinate}
          options={{ mapId: '62253722bdafca63' }}
          zoom={14}>
          <MarkerF
            position={userLocation.lat && userLocation.lng ? userLocation : defaultCordinate}
            icon={{
              url: '/location.png',
              scaledSize: {
                width: 50,
                height: 50
              }
            }}
          />
          {businessList.map((item, index) => index <= 10 && (
            <Markers business={item} key={index} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default GoogleMapView
