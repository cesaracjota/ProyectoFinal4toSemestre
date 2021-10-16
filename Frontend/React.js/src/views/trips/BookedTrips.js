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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { retrieveCoupons, updateCoupon, deleteCoupon } from "../../actions/coupons";

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

    const [indice, setIndice] = useState({
      id: null,
      code: "",
      created_date: "",
      expired_date: "",
      amount: null,
      count: null,
      used_count: null
    });
    const coupon = useSelector(store => store.coupons);
    const dispatch = useDispatch();
    const classes = useStyles();


    useEffect(() => {
      dispatch(retrieveCoupons());
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
    const getBadge = status => {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'danger'
        default: return 'primary'
      }
    }

    const removeCoupon = () => {
      dispatch(deleteCoupon(indice))
        .then(() => {
          props.history.push("/dashboard/coupons/all");
        })
        .catch(e => {
          console.log(e);
        });
        setOpen(false);
    };
    const updateCoupons = (e) => {
      
      e.preventDefault();

      
      dispatch(updateCoupon(indice.id, indice))
      .then(response => {
        console.log(response);
      })
      .catch(a => {
        console.log(a);
      });
      setOpenUpdate(false)
      setOpenEdit(false);
    };
      const fields = ['code', 'start_date', 'expired_date', 'amount','count', 'used_count', 'status', 'action']
      const data = coupon.map((coupons) =>{
        
        return {
          id: coupons.id,
          code: coupons.code,
          start_date: coupons.start_date,
          expired_date: coupons.expired_date,
          amount: coupons.amount,
          count: coupons.coupon_number,
          used_count: coupons.used_count,
          status: coupons.status,
        }
    })
    var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    const fecha =new Date(usaTime)
    
    return (
      <>
      <br/>
      <h3>Booked Trips</h3>
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
                    'status':
                    (item)=>(
                      <td>
                        {item.expired_date<fecha.toISOString().slice(0,10) ?
                        <CBadge color={getBadge('Inactive')}>
                          Inactive
                        </CBadge>
                        :<CBadge color={getBadge('Active')}>
                        Active
                      </CBadge>
                        }
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

                        
                          <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                          <form onSubmit={(e)=>updateCoupons(e)}>
                          <DialogContent>
                            <DialogContentText>
                              To subscribe to this website, please enter your email address here. We will send updates
                              occasionally.
                            </DialogContentText>

                            <div className={classes.root}>
                            
                            <TextField
                              autoFocus
                              margin="dense"
                              
                              label="Code"
                              defaultValue={indice ? (indice.code):("")}
                              onChange = {(e)=>setIndice({...indice,code: e.target.value})}
                              type="text"
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              
                              label="Created Date ..."
                              defaultValue={indice ? (indice.created_date):("")}
                              onChange = {(e)=>setIndice({...indice,created_date: e.target.value})}
                              type="date"
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              
                              label="Expired Date ..."
                              defaultValue={indice ? (indice.expired_date):("")}
                              onChange = {(e)=>setIndice({...indice,expired_date: e.target.value})}
                              type="date"
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              
                              label="Amount"
                              defaultValue={indice ? (indice.amount):("")}
                              onChange = {(e)=>setIndice({...indice,amount: e.target.value})}
                              type="number"
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              
                              label="Count"
                              defaultValue={indice ? (indice.count):("")}
                              onChange = {(e)=>setIndice({...indice,count: e.target.value})}
                              type="number"
                              fullWidth
                            />

                            <TextField
                              autoFocus
                              margin="dense"
                              
                              label="Used Count ..."
                              defaultValue={indice ? (indice.used_count):("")}
                              onChange = {(e)=>setIndice({...indice,used_count: e.target.value})}
                              type="number"
                              rows={8}
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
                            <Button type="submit" value="Confirm"onClick={(e)=>updateCoupons(e)} color="primary" autoFocus>
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
                            <Button onClick={()=>removeCoupon()} color="secondary" autoFocus>
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
  
  export default Tables