import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import {fueltype} from '../vehicles/VehicleType'
import { createVehicle, retrieveVehicles, deleteVehicle } from "../../actions/vehicle";
import { createRent, deleteRent } from "../../actions/rents";
import {createWorker } from '../../actions/workers'
import {createWorkerPayment} from '../../actions/payment'
import { DropzoneArea } from 'material-ui-dropzone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SnackbarProvider, useSnackbar } from 'notistack';
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
import {currencies, licensetype, vehicletype} from './LicenseType'
import { Grid } from '@material-ui/core';
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

    const dispatch = useDispatch();
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('');
    const [license, setLicense] = React.useState('');
    const [haveVehicle, setHaveVehicle] = React.useState(false);
    const [fuel, setFuel] = React.useState('');
    const [vehicleoptiones, setVehicleoptions] = React.useState('');
    const [vehicle, setVehicle] = React.useState('');
    const [photo, setPhoto] = useState('No file Choosen')
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedDatePurchase, setSelectedDatePurchase] = React.useState(new Date('2001-08-18'));
    const [selectedDatePay, setselectedDatePay] = React.useState(new Date());
    const vehiclechoice = useSelector(store => store.vehicles);
    const [open, setOpen] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
      dispatch(retrieveVehicles());
    },[dispatch]);


    const  generateRandomString = (num) => {
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result1= '#';
      const charactersLength = characters.length;
      for ( let i = 0; i < num; i++ ) {
          result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
  
      return result1;
  }
    const initialDriver = {
      id: null,
      name: "",
      mobile: null,
      email: "",
      address: "",
      joindate: "",
      trips: 0,
      ageWorker: null,
      gender: "",
      license: "",
      photo: "",
      rent_info: ''
    }
    const initialVehicle = {
      id: null,
      number: "",
      type: "",
      model: "",
      capacity: null,
      insurance_renewal_date: "",
      fuel: "",
      photo_vehicle: "",
      alquiler: 0
    }

    const initialRent ={
      id: null,
      vehicle_id: '',
      amount: 0
    }
    const initialPayment ={
      id: null,
      transaction: generateRandomString(7),
      name: null,
      date: '',
      amount_pay: null,
      status: 'UNPAID',
      commission: null
    }
    const [payment, setPayment] = useState(initialPayment)
    const [vehicleRedux, setVehicleRedux] = useState(initialVehicle)
    const [driver, setDriver] = useState(initialDriver)
    const [rent, setRent] = useState(initialRent)
    const handlehaveVehicle =()=>{
      setHaveVehicle(currentIsOpen => !currentIsOpen)
      
    }
    const handleDateChange = event => {
      setSelectedDate(event);
      
      setDriver({ ...driver, joindate: event.toJSON().slice(0,10) })
    };
    const handleClickOpen = () => {
      
      setOpen(true);
    };
    const handleDateChangePurchase = (date) => {
      setSelectedDatePurchase(date);
      setVehicleRedux({...vehicleRedux,insurance_renewal_date:date.toJSON().slice(0,10)})
    };
    const handleDateChangePay = (datef) => {
      setselectedDatePay(datef);
      setPayment({...payment,date:datef.toJSON().slice(0,10)})
    };
    const handleChangeGender = (event) => {

      setCurrency(event.target.value);
      setDriver({ ...driver, gender: event.target.value})
    };
    const handleChangeLicense = (event) => {
      setLicense(event.target.value);
      setDriver({ ...driver, license: event.target.value})
    };
    const handleVehicleType = (event) => {
      setVehicle(event.target.value);
      setRent({...rent, vehicle_id:event.target.value })
    };
    const handleFuelType = (event) => {
      setFuel(event.target.value);
      setVehicleRedux({ ...vehicleRedux, fuel: event.target.value})
    };
    const handleVehicleTypes = (event) => {
      setVehicleoptions(event.target.value);
      setVehicleRedux({ ...vehicleRedux, type: event.target.value})
    };
    const handleClose = () => {
      setOpen(false);
    };
    const onchangephoto = (archivo) => {
      Array.from(archivo).forEach(archivo =>{
        var reader = new FileReader();
        reader.readAsDataURL(archivo)
        reader.onload = function() {
          var arrayAuxiliar = []
          var base64 = reader.result;
          arrayAuxiliar = base64.split(',')
        
          setDriver({ ...driver,photo: arrayAuxiliar[1]})
        }
      }
      )
      
      setPhoto(archivo[0] ? archivo[0].name: "No file choosen"  )
    }

    const onchangephotoVehicle = (archivo) => {
      Array.from(archivo).forEach(archivo =>{
        var reader = new FileReader();
        reader.readAsDataURL(archivo)
        reader.onload = function() {
          var arrayAuxiliar = []
          var base64 = reader.result;
          arrayAuxiliar = base64.split(',')
        
          setVehicleRedux({ ...vehicleRedux,photo_vehicle: arrayAuxiliar[1]})
        }
      }
      )
    }


    const saveWorker = () => {
            
      const {number, model, capacity, fuel, insurance_renewal_date, type, photo_vehicle} = vehicleRedux
      const {vehicle_id, amount} = rent
      const {name, mobile, email, address, joindate, trips,ageWorker,gender,license, photo} = driver
      const {transaction,date, amount_pay, status, commission} = payment
      
      if(haveVehicle){
      dispatch(createVehicle(number, model, capacity, fuel, insurance_renewal_date, type, photo_vehicle))
      .then((data) =>{
        console.log("creo el vehiculo")
          dispatch(createRent(data.id, amount))
          .then((data2) =>{
            console.log(name, mobile, email, address, joindate, trips,ageWorker,gender,license, data2.id)
            dispatch(createWorker(name, mobile, email, address, joindate, trips,ageWorker,gender,license, photo, data2.id))
            .then((data3) =>{
              console.log('creo el trabajador')
              dispatch(createWorkerPayment(transaction, data3.id, date, amount_pay, status, commission))
              .then(() =>{
                console.log( "creo el pago")
                enqueueSnackbar('This is a success message!', { variant: 'success' });
                props.props.history.push("/dashboard/drivers/all");
              })
              .catch(() =>{
                dispatch(deleteRent(data2.id)).then(() =>console.log("Se elimino la renta"))
                dispatch(deleteVehicle(data.id)).then(() =>console.log("Se elimino el vehiculo"))
                enqueueSnackbar('Introduzca los datos de paga!', { variant: 'error' });
                setOpen(false)
              })
            })
            .catch((a) =>{
              console.log(driver)
              dispatch(deleteRent(data2.id)).then(() =>console.log("Se elimino la renta"))
              dispatch(deleteVehicle(data.id)).then(() =>console.log("Se elimino el vehiculo"))
              enqueueSnackbar('No se pudo crear el usuario!', { variant: 'error' });
              setOpen(false)
              
            })
          }).catch(() =>{
            dispatch(deleteVehicle(data.id)).then(() =>console.log("Se elimino el vehiculo"))
            enqueueSnackbar('Ingrese el precio de renta por los servicios!', { variant: 'error' });
            setOpen(false)
          })
      })
      .catch(() => {
        enqueueSnackbar('Inserte todos los datos del Vehiculo!', { variant: 'error' });
        setOpen(false)

      });

    }else{

      dispatch(createRent(vehicle_id, amount))
          .then((data2) =>{
            console.log("creo la renta")
            dispatch(createWorker(name, mobile, email, address, joindate, trips,ageWorker,gender,license, photo, data2.id))
            .then((data3) =>{
              console.log('creo el trabajador')
              console.log(data3.id)
              dispatch(createWorkerPayment(transaction, data3.id, date, amount_pay, status, commission))
              .then(() =>{
                console.log( "creo el pago")
                props.props.history.push("/dashboard/drivers/all")})
              .catch(() =>{
                enqueueSnackbar('Introduzca los datos de paga!', { variant: 'error' });
                dispatch(deleteRent(data2.id)).then(() =>console.log("Se elimino la Renta"))
                setOpen(false)
              })
            })
            .catch(() =>{
              enqueueSnackbar('Inserte los datos del Usuario Correctamente!', { variant: 'error' });
              dispatch(deleteRent(data2.id)).then(() =>console.log("Se elimino la Renta"))
              setOpen(false)
            })
          }).catch(() =>{
            vehicle_id ? enqueueSnackbar('Vehiculo en uso!', { variant: 'error' }): enqueueSnackbar('Seleccione un Vehiculo!', { variant: 'error' })
            
            setOpen(false)
          })
    }
    }

    return(
        <>
        <br/>
        <h3>Add New Driver</h3>
        <br/>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                  Add Driver
              </CCardHeader>
              <CCardBody>
                <h5>Basic Information</h5>
                <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>      
                    <TextField
                        autoFocus
                        margin="dense"
                        required
                        onChange = {(e) => setDriver({ ...driver,name: e.target.value })}
                        label="Name"
                        type="text"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        
                        margin="dense"
                        id="mobile"
                        label="Mobile Number"
                        onChange = {(e) => setDriver({ ...driver,mobile: e.target.value })}              
                        
                        type="number"
                        fullWidth
                    />
                    </Grid>

                    
                    <Grid item xs={6}>
                    <TextField
                        
                        margin="dense"
                        id="email"
                        label="Email"
                        onChange = {(e) => setDriver({ ...driver,email: e.target.value })}
                        type="email"
                        fullWidth
                    />
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
                        
                        margin="dense"
                        id="address"
                        label="Address ..."
                        onChange = {(e) => setDriver({ ...driver,address: e.target.value })}                    
                        type="text"
                        fullWidth
                    />
                    </Grid>

                  <Grid item xs={6}>
                   <TextField
                        margin="dense"
                        label="Age"
                        onChange = {(e) => setDriver({ ...driver,ageWorker: e.target.value })}                     
                        type="number"
                        fullWidth
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        label="Gender"
                        select
                        value={currency}
                        onChange={handleChangeGender}
                        fullWidth
                    >
                    {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                    ))}
                  </TextField>

                  </Grid>
{/* licencia */}
                  <Grid item xs={6}>
                  <TextField
                        margin="dense"
                        id="license"
                        label="License"
                        select
                        value = {license}
                        onChange={handleChangeLicense}
                        fullWidth  
                    >
                      
                    {licensetype.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                    ))}
                  </TextField>
                  </Grid>

                  <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  
                  <KeyboardDatePicker
                    margin="dense"

                    id="driver"
                    label="Join Date"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    fullWidth
                  />
                  </MuiPickersUtilsProvider>
                  </Grid>
                  
{/* upload file */}
                  <>
                  <Grid item xs={6}>
                  <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange = {(e) => onchangephoto(e.target.files)}  
                      
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span">
                        Photo
                      </Button>
                      <span className={classes.file}>{photo ? photo : "No file choosen"}</span>
                    </label>
                    </Grid>
                    
                    </>
{/* //////////////// */}

                  

                  

                    <Grid item xs={6}>
                Do you Have a vehicule???
                <Checkbox
                  color="default"
                  onChange= {handlehaveVehicle}
                  value= {haveVehicle}
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
                </Grid>
                </Grid>
                </div>
                <br/><br/><br/>
                <h5>Vehicle Information</h5>
                {haveVehicle ? <div>
                  
                <div className={classes.root}>
                <Grid container spacing={3}>

                  <Grid item xs={6}>
                    <TextField
                        
                        margin="dense"
                        id="placa"
                        label="Vehicule Number"
                        type="text"
                        fullWidth
                        onChange={(e)=>setVehicleRedux({...vehicleRedux,number:e.target.value})}
                    />
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        label="Vehicle Type"
                        select
                        fullWidth
                        value = {vehicleoptiones}
                        onChange={handleVehicleTypes}
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
                        
                        label="Vehicle Model"
                        type="text"
                        fullWidth
                        onChange={(e)=>setVehicleRedux({...vehicleRedux,model:e.target.value})}
                    />
                    </Grid>

                    <Grid item xs={6}>
                    <TextField 
                        margin="dense"
                        
                        label="Seating Capacity"
                        type="number"
                        fullWidth
                        onChange={(e)=>setVehicleRedux({...vehicleRedux,capacity:e.target.value})}
                    />
                    </Grid>

                    <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  
                  <KeyboardDatePicker
                    margin="dense"
                    
                    label="Insurance Renewal Date"
                    format="MM/dd/yyyy"
                    value={selectedDatePurchase}
                    onChange={handleDateChangePurchase}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    fullWidth
                  />
                  </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        
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
        {/* ///////////// */}
                            <>
                            <br/><br/><br/><br/><br/>
                    <h5>&nbsp;&nbsp;&nbsp;Uploaded Image</h5><br/>  <br/>  
                    <DropzoneArea
                      onChange={(files) => onchangephotoVehicle(files)}
                      filesLimit={1}
                      acceptedFiles={['image/*']}
                    />
                    <br/>
                            
                            </>
        {/* //////////////// */}
                    </Grid> 
                          </div>

                
              </div>
        :
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                  <TextField
                        margin="dense"
                        
                        label="Vehicle"
                        select
                        fullWidth
                        value = {vehicle}
                        onChange={handleVehicleType}
                        
                    >
                    {vehiclechoice.filter(value => value.alquiler>0).map((option) =>(

                    <MenuItem key={option.id} value={option.id} >
                      {option.number}
                    </MenuItem>
                    ))}
                  </TextField>
                  </Grid>

                </Grid>
          </div>}
          <br/>
          <h5>Rent Service and Payment</h5>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField           
                  margin="dense"
                  id="purchase"
                  label="Price Service (S/.) "
                  type="number"
                  fullWidth
                  onChange={(e)=>setRent({...rent,amount: e.target.value })}
                />
            </Grid>
            <Grid item xs={6}>
              <TextField           
                  margin="dense"
                  id="purchase"
                  label="Payment (S/.)"
                  type="number"
                  fullWidth
                  onChange={(e)=>setPayment({...payment,amount_pay: e.target.value })}
                />
            </Grid>
            <Grid item xs={6}>
              <TextField           
                  margin="dense"
                  id="purchase"
                  label="Commission (%)"
                  type="number"
                  fullWidth
                  onChange={(e)=>setPayment({...payment,commission: e.target.value })}
                />
            </Grid>
            <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  
                  <KeyboardDatePicker
                    margin="dense"
                    
                    label="Start Payment Date"
                    format="MM/dd/yyyy"
                    value={selectedDatePay}
                    onChange={handleDateChangePay}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    fullWidth
                  />
                  </MuiPickersUtilsProvider>
                  </Grid>
          </Grid>
          <br/>
                <div className={classes.buttons}>
                    <Button 
                    onClick={handleClickOpen}variant="contained"color="primary">Submit</Button>
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
          <DialogTitle id="alert-dialog-title">{"Are you sure you want add Coupon?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Add Worker Now
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={() =>saveWorker()} color="primary" autoFocus>
              Add Worker
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
// export default Tables