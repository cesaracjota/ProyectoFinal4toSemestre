import React, { useCallback, useRef, useState, useEffect } from "react";
import {useDispatch} from 'react-redux'
import { GoogleMap, Polyline, useLoadScript } from "@react-google-maps/api";
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CoordsDataService from '../../service/coordsService'
import {updateCoordinate} from '../../actions/coordinates'
import { SnackbarProvider, useSnackbar } from 'notistack'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
const App = () => {

  const polylineRef = useRef(null);
  const listenersRef = useRef([]);
  const [path, setPath] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    retrieveCoords()
  },[])



  // Call setPath with new edited path
  const onEdit = useCallback(() => {
      const nextPath = polylineRef.current
        .getPath()
        .getArray()
        .map((latLng) => latLng.toJSON());
      setPath(nextPath);
    
  }, [setPath]);

  // Bind refs to current Polyline and listeners
  const onLoad = useCallback(
    (polyline) => {
      polylineRef.current = polyline;
      const path = polyline.getPath();
      
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );
  const retrieveCoords =  () => {
    CoordsDataService.getAll()
        .then(response => {
        const data = response.data.map(data =>{
          
          return{
            id: data.id,
            latitude: parseFloat(data.lat),
            longitude: parseFloat(data.lng)
          }
        })
        setPath(data);
        })
        .catch(e => {
        console.log(e);
        });
    };
  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polylineRef.current = null;
  }, []);
  const handleClickOpen = () => {
      
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const coordinatel = path.map((coord)=>{
    return {
      lat: coord.latitude,
      lng: coord.longitude
    }
  })
  const mapContainerStyle = {
    width: "100%",
    height: "92vh"
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCyYhBencOQovHxolUxJJwQVCXp4Fl8a0M"
  });

  const centre = {lat: -16.419087, lng: -71.522553};

  if (loadError) return "Error loading Google Map";
  if (!isLoaded) return "Loading Maps...."; 

  const saveroute = (variant) =>{
      const message = 'success'
      for(var i=1; i<13; i++){
        dispatch(updateCoordinate(i, path[i-1]))
        .catch(a => {
          console.log(a);
        });
      }
      setEdit(false)
      enqueueSnackbar('Route correctly edited!', { variant: message });
      setOpen(false);
    };
  
  return (
    <>
      <Grid container spacing={1}>
          <Grid item xs={9} >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={centre}
              >
                <Polyline
                  ref={polylineRef}
                  path={coordinatel}
                  options={{ editable: edit, strokeColor: "#0000FF" }}
                  // Event used when manipulating and adding points
                  onMouseUp={onEdit}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                />
              </GoogleMap>
          </Grid>
          <Grid item xs={3}>
            <br/>
            <CRow>
              <CCol xs="12" lg="12">
                <CCard>
                <CCardHeader className="textc">

                  <h5>Edit Route Map</h5>
              </CCardHeader>
              <CCardBody>
                lorem ipsum dolor sit amet, consectet lorem ips loremlorem ipsum dolor sit amet


                <br/><br/>
                <div className='textc'>
                    <Button variant="contained" color="primary" component="span" onClick={() =>setEdit(!edit)}>
                            Edit
                    </Button> &nbsp;&nbsp;&nbsp;
                    <Button variant="contained" color="primary" component="span" onClick={handleClickOpen}>
                            Save
                    </Button>
                </div>
              </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </Grid>
      </Grid>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to modify this route?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            this will change the path to all users
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button  color="primary" autoFocus onClick={()=>saveroute('success')}>
              Edit Route
            </Button>
          </DialogActions>
        </Dialog>
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
