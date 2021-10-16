// import { Component } from "react";
// import { Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";
// import mapsKey from '../../credentials'
// import paradero from '../../../src/assets/img/paradero-rojo.png'


// import {
//   CCard,
//   CCol,
//   CRow
// } from '@coreui/react'
// // import '../service/Ubication.js'
// // global.latidud = latitud
// // global.longitud = longitud

// // navigator.geolocation.getCurrentPosition(function(posicion){
// //   let latitud= posicion.coords.latitude
// //   let longitud= posicion.coords.longitude
// // })


// export class MapContainer extends Component {
//   state = {
//     showingInfoWindow: false,
//     activeMarker: {},
//     selectedPlace: {}
//   };

//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });

//   onMapClicked = (props) => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       });
//     }
//   };




  
//   render() {
//     return (
//       <>
//       <CRow>
//       <CCol>
//       <CCard>
//           <Map 
//                   google={this.props.google}
//                   initialCenter={{lat: -16.419087, lng: -71.522553}}
//                   gestureHandling={'greedy'}
//                   style={style}
//                   onClick={this.onMapClicked}
//                   options ={{gestureHandling:'greedy'}}>
//                   <Marker onClick={this.onMarkerClick} name={"Current location"} />
//                   <Marker
//                       id={1}
//                       onClick={this.onMarkerClick}
//                       title={'The marker`s title will appear as a tooltip.'}
//                       name={'SOMA'}
//                       position={{lat: -16.429098, lng: -71.522512}}

//                       icon={{
//                         url: paradero,

//                       }} />
//                   <InfoWindow
//                     marker={this.state.activeMarker}
//                     visible={this.state.showingInfoWindow}
//                   >
//                     <div>
//                       <h1>{this.state.selectedPlace.name}</h1>
//                     </div>
//                   </InfoWindow>




import React, {   useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow, TrafficLayer  } from "@react-google-maps/api";
import { Grid } from '@material-ui/core';
import { SnackbarProvider } from 'notistack'
import mqtt from 'mqtt';
import paradero from '../../../src/assets/img/paradero-rojo.png'
import vehiculos from '../../../src/assets/img/autobus-escolar.png'
import coordi from './coords'

const clientId = `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`
const url = `ws://23.20.206.201:9001`;
const options = {
  keepalive: 30,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  rejectUnauthorized: false
};
options.clientId = clientId;
const clientxd =mqtt.connect(url, options)
clientxd.subscribe('Lamp')
clientxd.subscribe('Vehicle1')
clientxd.subscribe('Vehicle2')
clientxd.subscribe('Vehicle3')
const App = () => {


  const [client, setClient] = useState(null);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    setClient(clientxd);
    if (client) {
      client.on('connect', () => {
        console.log("connected")
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        console.log("reconnect")
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  useEffect(() => {
    
  })

  const mapContainerStyle = {
    width: "100%",
    height: "92vh"
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCyYhBencOQovHxolUxJJwQVCXp4Fl8a0M"
  });
  const onMarkerClick = () =>{
    return(
      <InfoWindow
      map
      position={position}
      >
      <div style={divStyle}>
        <h1>InfoWindow</h1>
      </div>
    </InfoWindow>
    )
  }
  const centre = {lat: -16.419087, lng: -71.522553};

  if (loadError) return "Error loading Google Map";
  if (!isLoaded) return "Loading Maps...."; 

  
  const coords = payload.topic==='Lamp' ? payload.message : ""


  if(coords==null){
    let coords = '-16.419087 -71.522553'
    var num = coords.split(" ")
  }else{
    num = coords.split(" ")
  }


  const position = {
    lat: parseFloat(num[0]),
    lng: parseFloat(num[1])
  }

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
  }

  return (
    <>
      <Grid container spacing={1}>
          <Grid item xs={12} >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={centre}>

                <TrafficLayer />
                 
                 {coordi.map((paraderoc, index) =>{
                   return(
                  <Marker
                  position={{lat : paraderoc.lat, lng : paraderoc.lng}}
                  title={'Paradero '+index.toString()}
                  name={'SOMA'}
                  clickable
                  key={index}
                  onClick={onMarkerClick}
                  icon={{url: paradero}} />
                   )
                 })}

                <Marker
                  position={position}
                  title={'The marker`s title will appear as a tooltip.'}
                  name={'SOMA'}
                  clickable
                  onClick={onMarkerClick}
                  icon={{url: vehiculos}}
                 />


              </GoogleMap>
          </Grid>
      </Grid>
    </>
  );
};
export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <App props={props} />
    </SnackbarProvider>
  );
}


