import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {CCard,CCardBody,CCardHeader,CCol,CDataTable,CRow} from '@coreui/react'

import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { retrieveFares, updateFare, deleteFare } from "../../actions/fares";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0.3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '33ch',
    },
  },
}));

const Tables = () => {


    const [open, setOpen] = React.useState(false);
    const [openedit, setOpenEdit] = React.useState(false);
    const [openupdate, setOpenUpdate] = React.useState(false);

    const [indice, setIndice] = useState({
      Vehicle_Type: '',
      fare_per_km: null,
      minimum_fare: null,
      minimum_distance: null,
      waiting_fare: null
    });
    const fare = useSelector(store => store.fares);
    const dispatch = useDispatch();
    const classes = useStyles();


    useEffect(() => {
      dispatch(retrieveFares());
    },[dispatch]);

    const handleClickOpen = (index) => {
      setIndice(index);
      setOpen(true);
    };
    const handleClickOpenUpdate = (e) => {
      
      setOpenUpdate(true);
    };
    const handleCloseUpdate = () => {
      setOpenUpdate(false);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleClickOpenEdit = (index) => {
      setIndice(index);
      setOpenEdit(true);
      
    };
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };

    const removeFare = () => {
      dispatch(deleteFare(indice))
        .then(() => {
          dispatch(retrieveFares());
        })
        .catch(e => {
          console.log(e);
        });
        setOpen(false);
    };
    const updateFares = (e) => {
      e.preventDefault();
      
      dispatch(updateFare(indice.type, indice))
      .then(() => {
        dispatch(retrieveFares());
        
      })
      .catch(a => {
        console.log(a);
      });
      setOpenUpdate(false)
      setOpenEdit(false);
    };
      const fields = ['id','type','fare_per_km', 'minimum_fare', 'minimun_distance', 'waiting_fare', 'action']
      const data = fare.map((fares, index) =>{
        return {
          id: index+1,
          type: fares.type,
          fare_per_km: fares.fare_per_km,
          minimum_fare: fares.minimum_fare,
          minimun_distance: fares.minimun_distance,
          waiting_fare: fares.waiting_fare,
        }
    })
    return (
      <>
      <br/>
      <h3>All Fares</h3>
      <br/>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
              </CCardHeader>
              <CCardBody>
              <CDataTable
                items = {data}
                fields= {fields}
                itemsPerPage={10}
                pagination
                tableFilter
                hover
                sorter
                itemsPerPageSelect
                scopedSlots = {{
                    'action':
                    (item)=>(
                      
                      <td>
                        <IconButton 
                        size="small"
                        onClick={()=>handleClickOpenEdit(item)}
                         >
                          <CreateIcon style={{ fontSize: 15 }} />
                        </IconButton>
{/* update */}
                        <Dialog open={openedit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                          <DialogTitle id="form-dialog-title">Edit Fare</DialogTitle>
                          <form onSubmit={(e)=>updateFares(e)}>
                          <DialogContent>
                            <DialogContentText>
                            In this section you can change the rates that you created previously, remember that the rates are by type of vehicle
                            </DialogContentText>
                            <div className={classes.root}>
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Vehicle Type"
                              disabled
                              value={indice ? (indice.type):("")}
                              type="text"
                              fullWidth
                            />             
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Fare per km"
                              defaultValue={indice ? (indice.fare_per_km):("")}
                              onChange = {(e)=>setIndice({...indice,fare_per_km: e.target.value})}
                              type="number"
                              InputProps={ {startAdornment: <InputAdornment position="start">$</InputAdornment>,}}
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              InputProps={ {startAdornment: <InputAdornment position="start">$</InputAdornment>,}}
                              label="Minimum Fare ..."
                              defaultValue={indice ? (indice.minimum_fare):("")}
                              onChange = {(e)=>setIndice({...indice,minimum_fare: e.target.value})}
                              type="number"
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              InputProps={ {endAdornment: <InputAdornment position="end">Km</InputAdornment>,}}
                              label="Minimum Distance ..."
                              defaultValue={indice ? (indice.minimun_distance):("")}
                              onChange = {(e)=>setIndice({...indice,minimun_distance: e.target.value})}
                              type="number"
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              InputProps={ {startAdornment: <InputAdornment position="start">$</InputAdornment>,}}
                              label="Waiting Fare"
                              defaultValue={indice ? (indice.waiting_fare):("")}
                              onChange = {(e)=>setIndice({...indice,waiting_fare: e.target.value})}
                              type="number"
                              fullWidth
                              rows={6}
                            />
                          
                          </div>
                          </DialogContent>
                          
                          <DialogActions>
                            <Button onClick={handleCloseEdit} color="primary">
                              Cancel
                            </Button>
                            <Button  onClick={(e)=>handleClickOpenUpdate(e)} color="primary">
                              Update
                            </Button>
                          </DialogActions>
{/* inicio pop up */}
                          <Dialog
                          open={openupdate}
                          onClose={handleCloseUpdate}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            If you edit, you will not be able to recover the data
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseUpdate} color="primary">
                              Cancel
                            </Button>
                            <Button type="submit" value="Confirm"onClick={(e)=>updateFares(e)} color="primary" autoFocus>
                              Confirm
                            </Button>
                          </DialogActions>
                        </Dialog>
 {/* popup */}
                          </form>
                        </Dialog>
{/* delete */}
                        <IconButton size="small" 
                        color="secondary" 
                        className={classes.margin}
                        onClick={()=>handleClickOpen(item.type)}>
                          <DeleteIcon className="fa fa-plus-circle" color="secondary" style={{ fontSize: 15 }} />
                        </IconButton>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            If you delete, you will not be able to recover the data
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={()=>removeFare()} color="secondary" autoFocus>
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                        
                      </td>
                    )
                   
                }}
              />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
  
      </>
    )
  }
  
  export default Tables