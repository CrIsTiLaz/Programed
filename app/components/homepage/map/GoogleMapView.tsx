import React, { useContext } from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import { UserLocationContext } from '@/app/context/UserLocationContext'
import Markers from './Markers'

function GoogleMapView({ businessList }) {
  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const containerStyle = {
    width: '100%',
    height: '70vh'
  }

  const cordinate = { lat: 45.75, lng: 21.234 }
  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        mapIds={['62253722bdafca63']}>
        <GoogleMap mapContainerStyle={containerStyle}
          center={userLocation}
          options={{ mapId: '62253722bdafca63' }}
          zoom={14}>
          <MarkerF
            position={userLocation}
            icon={{
              url: '/location.png',
              scaledSize: {
                width: 50,
                height: 50
              }
            }}
          />
          {businessList.map((item, index) => index <= 10 && (
            // eslint-disable-next-line react/jsx-key
            <Markers business={item} key={index} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default GoogleMapView