import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { createCoupon } from "../../actions/coupons";
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
    var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = React.useState(new Date(usaTime));
    const [selectedDateExpired, setSelectedDateExpired] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();


    
    const handleClose = () => {
      setOpen(false);
    };
    const  generateRandomString = (num) => {
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result1= '#';
      const charactersLength = characters.length;
      for ( let i = 0; i < num; i++ ) {
          result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
  
      return result1;
  }
    const initialCoupon = {
      id: null,
      description: "",
      code: generateRandomString(8),
      start_date: selectedDateExpired.toISOString().slice(0,10) ,
      expired_date: "",
      amount: null,
      coupon_number: null,
      used_count: 0
    }

    const [coupon, setCoupon] = useState(initialCoupon)

    const handleDateChange = event => {
      setSelectedDate(event.setDate(event.getDate()));
      
      
      setCoupon({ ...coupon, start_date: event.toJSON().slice(0,10) })
    };
    const handleDateChangeExpired = event => {
      setSelectedDateExpired(event);
      
      setCoupon({ ...coupon, expired_date: event.toJSON().slice(0,10) })
    };
    const handleClickOpen = () => {
      
      setOpen(true);
    };
  
    const saveCoupon = () => {
      

      const {code, description, start_date, expired_date, amount, coupon_number, used_count} = coupon

      dispatch(createCoupon(code, description, start_date, expired_date, amount, coupon_number, used_count))
        .then((data) =>{
          setCoupon({
            id: data.id,
            code: data.code,
            created_date: data.created_date,
            expired_date: data.expired_date,
            amount: data.amount,
            count: data.count,
            used: data.used,
            used_count: data.used_count,
            status: data.status
          })
          props.props.history.push("/dashboard/coupons/all");

        })
        .catch(e => {
          enqueueSnackbar('Coupon could not be created!', { variant: 'error' });
          setOpen(false);
          console.log(e);
        });

    }

    return(
        <>
        <br/>
        <h3>Coupon Generation</h3>
        <br/>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                <h5>Coupon Generation</h5>
                <div className={classes.root}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>      
                    <TextField
                        autoFocus
                        margin="dense"
                        required
                        onChange = {(e) => setCoupon({ ...coupon, description: e.target.value })}
                        label="Coupon Text"
                        type="text"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        
                        <KeyboardDatePicker
                            margin="dense"
                            id="start_date"
                            label="Start Date"
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

                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        
                        <KeyboardDatePicker
                            margin="dense"
                            id="expired_date"
                            label="Expired Date"
                            format="dd/MM/yyyy"
                            value={selectedDateExpired}
                            onChange={handleDateChangeExpired}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                            fullWidth
                        />
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={12}>
                    <TextField
                        
                        margin="dense"
                        id="amount"
                        label="Amount (S/.)"
                        onChange = {(e) => setCoupon({ ...coupon, amount: e.target.value })}                    
                        type="number"
                        fullWidth
                    />
                    </Grid>

                  <Grid item xs={12}>
                   <TextField
                        margin="dense"
                        id="count"
                        label="Number of Coupons"
                        onChange = {(e) => setCoupon({ ...coupon,coupon_number: e.target.value })}                     
                        type="number"
                        fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                  <div className={classes.buttons}>
                      <Button 
                      onClick={handleClickOpen}variant="contained"color="primary">Submit</Button>
                  </div>
                </Grid>
              </Grid>
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
          <DialogTitle id="alert-dialog-title">{"Are you sure you want add Coupon?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Add Coupon Now
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={() =>saveCoupon()} color="primary" autoFocus>
              Add Coupon
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
