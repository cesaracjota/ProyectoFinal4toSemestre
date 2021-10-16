import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import { DropzoneArea } from 'material-ui-dropzone';
import {useDispatch} from 'react-redux'
import { createVehicle } from "../../actions/vehicle";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {fueltype, vehicletype} from './VehicleType'
import { Grid } from '@material-ui/core';
import { SnackbarProvider, useSnackbar } from 'notistack';
const useStyles = makeStyles((theme) => ({
    
    margin: {
      margin: theme.spacing(0.3),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    root: {
      '& > *': {
        flexGrow: 1
      },
    },
    root2: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',  
      },
    },
    buttons:{
        azimuth: 'center',
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(1),
            },
    },
    input: {
      display: 'none',
    },
    file: {
      marginLeft: '0.5rem',
      fontFamily: 'sans-serif'
    }
  }));

  
const Tables = (props) => {

    const classes = useStyles();
    const [fuel, setFuel] = React.useState('');
    const [vehicleoptiones, setVehicleoptions] = React.useState('');
    const [selectedDateInsurance, setSelectedDateInsurance] = React.useState(new Date('2001-08-18'));
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);



    const initialVehicle = {
      id: null,
      number: "",
      type: "",
      model: "",
      capacity: null,
      insurance_renewal_date: "",
      fuel: "",
      photo: "",
      alquiler: null
    }

    const [vehicle, setVehicle] = useState(initialVehicle)

    const handleDateChangeInsurance = (date) => {
      setSelectedDateInsurance(date);
      setVehicle({...vehicle,insurance_renewal_date:date.toJSON().slice(0,10)})
    };

    const handleFuelType = (event) => {
      setFuel(event.target.value);
      setVehicle({ ...vehicle, fuel: event.target.value})
    };
    
    const handleClose = () => {
      setOpen(false);
    };
    const handleVehicleType = (event) => {
      setVehicleoptions(event.target.value);
      setVehicle({ ...vehicle, type: event.target.value})
    };
    const handleClickOpen = () => {
      
      setOpen(true);
    };
    const onchangephoto = (archivo) => {
      Array.from(archivo).forEach(archivo =>{
        var reader = new FileReader();
        reader.readAsDataURL(archivo)
        reader.onload = function() {
          var arrayAuxiliar = []
          var base64 = reader.result;
          arrayAuxiliar = base64.split(',')
          
          setVehicle({ ...vehicle,photo: arrayAuxiliar[1]})
        }
      }
      )
      
      // setPhoto(archivo[0] ? archivo[0].name: "No file choosen"  )
    }

    const saveVehicle = () => {
      const {number, model, capacity, fuel, insurance_renewal_date, type, photo, alquiler} = vehicle

      dispatch(createVehicle(number, model, capacity, fuel, insurance_renewal_date, type, photo, alquiler))
        .then(data =>{
          setVehicle({
            id:data.id,
            number: data.number,
            model: data.model,
            capacity: data.capacity,
            fuel: data.fuel,
            insurance_renewal_date: data.insurance_renewal_date,
            type: data.type,
            photo: data.photo
            
          })
          
          props.props.history.push("/dashboard/vehicle/all")
        })
        .catch(e => {
          enqueueSnackbar('Vehicle could not be created!', { variant: 'error' });
          setOpen(false);
          console.log(e);
        });

    }

    return(
        <>
        <br/>
        <h3>Add New Vehicle</h3>
        <br/>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                  Add Vehicle
              </CCardHeader>
              <CCardBody>
                <h5>Vehicle Information</h5>
                <div>
                  
                <div className={classes.root}>
                <Grid container spacing={3}>

                  <Grid item xs={6}>
                    <TextField
                        
                        margin="dense"
                        id="placa"
                        label="Vehicule Number"
                        type="text"
                        fullWidth
                        onChange={(e)=>setVehicle({...vehicle,number:e.target.value})}
                    />
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        id="vehicle"
                        label="Vehicle"
                        select
                        fullWidth
                        value = {vehicleoptiones}
                        onChange={handleVehicleType}
                        
                    >
                    {vehicletype.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                    ))}
                  </TextField>
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        id="vehicle"
                        label="Fuel"
                        select
                        fullWidth
                        value = {fuel}
                        onChange={handleFuelType}
                    >
                    {fueltype.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                    ))}
                  </TextField>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        id='vehiclenumber'
                        label="Vehicle Model"
                        type="text"
                        fullWidth
                        onChange={(e)=>setVehicle({...vehicle,model:e.target.value})}
                    />
                    </Grid>

                    <Grid item xs={6}>
                    <TextField 
                        margin="dense"
                        label="Seating Capacity"
                        type="number"
                        fullWidth
                        onChange={(e)=>setVehicle({...vehicle,capacity:e.target.value})}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField 
                        margin="dense"
                        label="Rent (S/.)"
                        type="number"
                        fullWidth
                        onChange={(e)=>setVehicle({...vehicle,alquiler:e.target.value})}
                    />
                    </Grid>
                    <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  
                  <KeyboardDatePicker
                    margin="dense"
                    id="date-purchase"
                    label="Insurance Renewal"
                    format="MM/dd/yyyy"
                    value={selectedDateInsurance}
                    onChange={handleDateChangeInsurance}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    fullWidth
                  />
                  </MuiPickersUtilsProvider>
                  </Grid>
        {/* ///////////// */}
                            <>

                    <br/><br/><br/><br/><br/>
                    <h5>&nbsp;&nbsp;&nbsp;Uploaded Image</h5><br/>  <br/>  
                    <DropzoneArea
                      onChange={(files) => onchangephoto(files)}
                      filesLimit={1}
                      acceptedFiles={['image/*']}
                    />
                    <br/>
                            </>
        {/* //////////////// */}
                    </Grid> 
                          </div>

                
              </div> <br/><br/>
              <div className={classes.buttons}>
                    <Button 
                    onClick={handleClickOpen} variant="contained" color="primary">Submit</Button>

                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure you want add Vehicle?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Add Vehicle Now
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={() =>saveVehicle()} color="primary" autoFocus>
              Add Vehicle
            </Button>
          </DialogActions>
        </Dialog>
        </>
    )
}

export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <Tables props={props} />
    </SnackbarProvider>
  );
}
