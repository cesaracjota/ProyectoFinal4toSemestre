import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FareDataService from '../../service/faresService'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {
  CCard,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
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

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [validation, setValidation] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    const initialFare = {
      type: '',
      fare_per_km: null,
      minimum_fare: null,
      minimun_distance: null,
      waiting_fare: null
    }

    const [fare, setFare] = useState(initialFare)

    const handleClose = () => {
      setOpen(false);
    };
    const handleClickOpen = (e) => {
      
      fare.type === '' ? setValidation(true) :  setOpen(true)
      e.preventDefault()

    };
  
    const saveFare = () => {
      var data = {
        type: fare.type,
        fare_per_km: fare.fare_per_km,
        minimum_fare: fare.minimum_fare,
        minimun_distance: fare.minimun_distance,
        waiting_fare: fare.waiting_fare
      }

      FareDataService.create(data)
        .then((response) =>{
          setFare({
            type: response.data.type,
            fare_per_km: response.data.fare_per_km,
            minimum_fare: response.data.minimum_fare,
            minimun_distance: response.data.minimun_distance,
            waiting_fare: response.data.waiting_fare
          })
          props.props.history.push("/dashboard/fares/all");
        })
        .catch(e => {
          enqueueSnackbar('No se pudo crear la Tarifa!', { variant: 'error' });
          setOpen(false);
          console.log(e);
        });

    }

    return(
        <>
        <br/>
        <h3>Add Fare</h3>
        <br/>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                <h5>Add Fare</h5>
                <div className={classes.root}>
                <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={5}>
                
                <Grid item xs={12}>      
                    <TextField
                        margin="dense"
                        required
                        onChange = {(e) => {setFare({ ...fare,type: (e.target.value).toUpperCase() }); setValidation(false)}}
                        label="Vehicle Type"
                        type="text"
                        fullWidth
                        error={validation}
                    />
                    </Grid>
                    <Grid item xs={12}>      
                    <TextField
                        margin="dense"
                        required
                        id="fare_per_km"
                        onChange = {(e) => setFare({ ...fare,fare_per_km: e.target.value })}
                        label="Fare Perm KM (S/.)"
                        type="number"
                        fullWidth
                    />
                    </Grid>

                    <Grid item xs={12}>
                    <TextField
                        margin="dense"
                        id="minimum_fare"
                        label="Minimum Fare (S/.)"
                        onChange = {(e) => setFare({ ...fare,minimum_fare: e.target.value })}                               
                        type="number"
                        fullWidth
                        required
                    />
                    </Grid>

                    
                    <Grid item xs={12}>
                    <TextField
                        margin="dense"
                        id="minimun_distance"
                        label="Minimum Distance (km.)"
                        onChange = {(e) => setFare({ ...fare,minimun_distance: e.target.value })}
                        type="number"
                        fullWidth
                        required
                    />
                    </Grid>

                    <Grid item xs={12}>
                    <TextField
                        margin="dense"
                        
                        label="Waiting Price (S/.)"
                        onChange = {(e) => setFare({ ...fare,waiting_fare: e.target.value })}
                        type="number"
                        fullWidth
                        required
                    />
                    </Grid>
                    
                  <Grid item xs={12}>
                  <div className={classes.buttons}>
                      <Button 
                      onClick={(e) =>handleClickOpen(e)}variant="contained"color="primary" value="submit" type="submit">Submit</Button>
                  </div>
                </Grid>
                
              </Grid>
              </form>
              </div>
              </CCardHeader>
            </CCard>
          </CCol>
        </CRow>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Fare Register Successfully"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Fare Register Successfully
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={() =>saveFare()} color="primary" autoFocus>
              Add Fare
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
