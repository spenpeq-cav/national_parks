import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker, InfoBox } from '@react-google-maps/api';

function GoogleMaps(props) {
    const lat = Number(props.lat)
    const lng = Number(props.lng)

    const mapStyles = {
        height: "100vh",
        width: "100%"
    }
    const parkCenter = {
        lat: lat, lng: lng
    }

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
            <GoogleMap mapContainerStyle={mapStyles} zoom={11} center={parkCenter} mapTypeId="satellite">
                <Marker position={parkCenter}></Marker>  
            </GoogleMap>
        </LoadScript>
    )
}

export default GoogleMaps
