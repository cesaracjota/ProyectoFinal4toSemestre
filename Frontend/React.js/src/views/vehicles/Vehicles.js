import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  CCol,
  CRow
} from '@coreui/react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {deleteVehicle, retrieveVehicles } from "../../actions/vehicle";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0.3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {

    maxHeight: 400
    
  },
  media: {
    height: 140,
  }
}));


const Tables = () => {


    const [open, setOpen] = React.useState(false);
    const [keydelete, setKeyDelete] = React.useState('')


    const vehicle = useSelector(store => store.vehicles);
    const dispatch = useDispatch();
    const classes = useStyles();


    useEffect(() => {
      dispatch(retrieveVehicles());
    },[dispatch]);

    const handleClickOpen = (index) => {
      setKeyDelete(index);
      setOpen(true);
    };


    const handleClose = () => {
      setOpen(false);
    };

    const removeVehicle = () => {
      dispatch(deleteVehicle(keydelete))
        .catch(e => {
          console.log(e);
        });
        setOpen(false);
    };

    return (
      <>
      <br/>
      <h3>All Vehicles</h3>
      <br/>
        <CRow>
        <Grid container>
          {vehicle.map((vehicles, index)=>{
            return(
              
            <Grid item xs={12}  md={3} sm={6} key={index}>
            
          <CCol>
            <div key={index}>
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={'http://localhost:8000'+vehicles.photo}
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {vehicles.type}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Placa: {vehicles.number} <br/>
                    Fuel: {vehicles.fuel} <br/>
                    Capacity: {vehicles.capacity} <br/>
                    
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>

                <Button size="small" color="primary" onClick={() =>handleClickOpen(vehicles.id)}>
                Delete
                </Button>
            </CardActions>
            </Card>
            </div>
            </CCol>
            <br/>
            </Grid>
      )
      })}
      </Grid>
        </CRow>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            If you delete, you will not be able to recover the data and the user who drives will also be deleted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() =>removeVehicle()} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
  
  export default Tables