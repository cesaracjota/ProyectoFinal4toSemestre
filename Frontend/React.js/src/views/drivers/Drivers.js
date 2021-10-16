import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { updateRent } from "../../actions/rents";
import { updateWorker, deleteWorker, retrieveWorkers } from "../../actions/workers";
import {retrieveVehicles} from "../../actions/vehicle"
import { DropzoneArea } from 'material-ui-dropzone';
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
      margin: theme.spacing(1),
      width: '33ch',
    },
  },
}));


const Tables = (props) => {


    const [open, setOpen] = React.useState(false);
    const [openedit, setOpenEdit] = React.useState(false);
    const [openupdate, setOpenUpdate] = React.useState(false);
    const vehiclechoice = useSelector(store => store.vehicles);
    const [vehicle, setVehicle] = React.useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [indice, setIndice] = useState({
      id: null,
      name: "",
      mobile: null,
      email: "",
      address: "",
      joindate: "",
      trips: null,
      ageWorker: null,
      gender: "",
      license: "",
      photo: "",
      rent_info2: '',
      id_rent: null
    });
    const initialRent = {
      vehicle: '',
      amount: 0
    }
    const [rent, setRent] = useState(initialRent)
    const worker = useSelector(store => store.workers);
    const dispatch = useDispatch();
    const classes = useStyles();


    useEffect(() => {
      dispatch(retrieveWorkers());
    },[dispatch]);
    useEffect(() => {
      dispatch(retrieveVehicles());
    },[dispatch]);

    const handleClickOpen = (index) => {
      
      setIndice(index);
      setOpen(true);
    };
    const handleClickOpenUpdate = () => {
      
      // delete indice.photo
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

    const handleVehicleType = (event) => {
      setVehicle(event.target.value);
      setRent({...rent, vehicle: event.target.value })
    };
    const onchangephotoVehicle = (archivo) => {
      Array.from(archivo).forEach(archivo =>{
        var reader = new FileReader();
        reader.readAsDataURL(archivo)
        reader.onload = function() {
          var arrayAuxiliar = []
          var base64 = reader.result;
          arrayAuxiliar = base64.split(',')
          console.log('entro')
          setIndice({ ...indice,photo: arrayAuxiliar[1]})
        }
      }
      )
    }
    const getBadge = Status => {
        switch (Status) {
          case 'Active': return 'success'
          case 'Inactive': return 'danger'
          case 'Available': return 'warning'
          case 'Banned': return 'danger'
          default: return 'primary'
        }
      }

    const removeWorker = () => {
      dispatch(deleteWorker(indice))
        .then(() => {
          props.props.history.push("/dashboard/drivers/all/");
        })
        .catch(e => {
          console.log(e);
        });
        setOpen(false);
    };
    const updateDriver = () => {
      dispatch(updateWorker(indice.id, indice))
      .then((a) => {
        dispatch(retrieveWorkers())
        enqueueSnackbar('User Edited Successfully!', { variant: 'success' });
        console.log(a)
        if(rent.amount.length > 0 && rent.vehicle > 0){
          dispatch(retrieveWorkers())
          console.log(rent)
          dispatch(updateRent(indice.id_rent, rent))
          .then(() => {
            dispatch(retrieveWorkers())
            enqueueSnackbar('Change Vehicle Successfully!', { variant: 'success' });
          }).catch(() => {
            enqueueSnackbar('Dont Change Vehicle!', { variant: 'error' });
          })
        }

      })
      .catch(() => {
        enqueueSnackbar('Vehicle used! or incorrect data', { variant: 'error' });
      });
      setOpenUpdate(false)
      setOpenEdit(false);
    };
    const fields = ['photo','name','mobile','email', 'address', 'joindate', 'trips', 'vehicle','action']
    const data = worker.map((driver) =>{
      return{
        id: driver.id,
        name: driver.name,
        mobile: driver.mobile,
        email: driver.email,
        address: driver.address,
        joindate: driver.joindate,
        trips: driver.trips,
        vehicle: driver.rent_info2,
        age: driver.ageWorker,
        gender: driver.gender,
        license: driver.license,
        photo: driver.photo,
        amount: driver.amount,
        id_rent: driver.id_rent
      }
      
    })
    return (
      <>
      <br/>
      <h3>All Drivers</h3>
      <br/>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
              </CCardHeader>
              <CCardBody>
              <CDataTable
                items = {data}
                fields={fields}
                itemsPerPage={10}
                pagination
                tableFilter
                hover
                sorter
                itemsPerPageSelect

                scopedSlots = {{
                    'photo': 
                    (item)=>(
                      <td>
                        <Avatar src={'http://localhost:8000'+item.photo} />
                      </td>                
                    ), 
                    'Status':
                    (item)=>(
                      <td>
                        <CBadge color={getBadge(item.Rent)}>
                          {item.Rent}
                        </CBadge>
                      </td>
                    ),
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

                        
                          <DialogTitle id="form-dialog-title">Edit Driver</DialogTitle>
                          <form onSubmit={(e)=>updateDriver(e)}>
                          <DialogContent>
                            <DialogContentText>
                            In this section you can edit the information of the drivers
                            </DialogContentText>

                            <div className={classes.root}>
                            
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Name"
                              defaultValue={indice ? (indice.name):("")}
                              onChange = {(e)=>setIndice({...indice,name: e.target.value})}
                              type="text"
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Mobile ..."
                              defaultValue={indice ? (indice.mobile):("")}
                              onChange = {(e)=>setIndice({...indice,mobile: e.target.value})}
                              type="number"
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Email Address"
                              defaultValue={indice ? (indice.email):("")}
                              onChange = {(e)=>setIndice({...indice,email: e.target.value})}
                              type="email"
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Address ..."
                              defaultValue={indice ? (indice.address):("")}
                              onChange = {(e)=>setIndice({...indice,address: e.target.value})}
                              type="text"
                              fullWidth
                            />

                            <TextField
                              autoFocus
                              margin="dense"
                              label=".         "
                              defaultValue={indice ? (indice.joindate):("")}
                              onChange = {(e)=>setIndice({...indice,joindate: e.target.value})}
                              type="date"
                              
                            />

                            <TextField
                              autoFocus
                              margin="dense"
                              label="Trips ..."
                              defaultValue={indice ? (indice.trips):("")}
                              onChange = {(e)=>setIndice({...indice,trips: e.target.value})}
                              type="number"
                              rows={4}
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Actual Vehicle"
                              disabled
                              defaultValue={indice ? (indice.vehicle):("")}
                              type="text"
                              rows={4}
                            />
                            <TextField
                              margin="dense"
                              label="Change Vehicle"
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
                        <TextField
                              autoFocus
                              margin="dense"
                              label="Rent Price"
                              defaultValue={indice ? (indice.amount):('')}
                              type="number"
                              rows={4}
                              onLoad={(e)=> setRent({...rent, amount: e.target.value })}
                              onChange={(e) => setRent({...rent, amount: e.target.value })}
                              />
                          </div>
                          <br/>
                          <h5>&nbsp;&nbsp;&nbsp;Uploaded Image</h5> 
                          <DropzoneArea
                            onChange={(files) => onchangephotoVehicle(files)}
                            filesLimit={1}
                            acceptedFiles={['image/*']}
                            initialFiles={['http://localhost:8000'+indice.photo]}
                          />
                          <br/>
                          
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
                          <DialogTitle id="alert-dialog-title">{"Are you sure you want to update driver?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            If you edit, you will not be able to recover the data
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseUpdate} color="secondary">
                              Cancel
                            </Button>
                            <Button type="submit" value="Confirm"onClick={(e)=>updateDriver(e)} color="primary" autoFocus>
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
                        onClick={()=>handleClickOpen(item.id)}>
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
                            <Button onClick={()=>removeWorker()} color="secondary" autoFocus>
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
{/* update */}
                        
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
  
  export default function IntegrationNotistack(props) {
    return (
      <SnackbarProvider maxSnack={3}>
        <Tables props={props} />
      </SnackbarProvider>
    );
  }