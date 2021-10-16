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
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import { updateWorkerPayment, retrieveWorkersPayment } from "../../actions/payment";

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
const ValuesofPay = [
  {
    value: 'PAID',
    label: 'PAID',
  },
  {
    value: 'UNPAID',
    label: 'UNPAID',
  }]
const Tables = () => {


    
    const [openedit, setOpenEdit] = React.useState(false);
    const [openupdate, setOpenUpdate] = React.useState(false);
    const [ValuesofPayment, setValuesofPayment] = useState('');

    const [indice, setIndice] = useState({
      id: null,
      transaction: "",
      name: "",
      date: "",
      amount: "",
      status: "",
      commision: ""
    });
    const worker = useSelector(store => store.payment);
    const dispatch = useDispatch();
    const classes = useStyles();


    useEffect(() => {
      dispatch(retrieveWorkersPayment());
    },[dispatch]);

    const handleClickOpenUpdate = (e) => {
      setOpenUpdate(true);
    };
    const handleCloseUpdate = () => {
      setOpenUpdate(false);
    };
    const handleChange = (event) => {
      setValuesofPayment(event.target.value);
      setIndice({...indice,status: event.target.value})
    };
    const handleClickOpenEdit = (index) => {
      setValuesofPayment(index.status)
      setIndice(index);
      setOpenEdit(true);
      
    };
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };
    const getBadge = Rent => {
        switch (Rent) {
          case 'PAID': return 'success'
          case 'UNPAID': return 'danger'
          case 'PENDING': return 'warning'
          default: return 'primary'
        }
      }


    const updateDriver = () => {
      dispatch(updateWorkerPayment(indice.transaction.slice(1,), indice))
      .then(() =>dispatch(retrieveWorkersPayment()))
      .catch(e => {
        console.log(e);
      });
      
      setOpenUpdate(false)
      setOpenEdit(false);
      
      
    };
    const fields = ['transaction','name','date', 'amount', 'status', 'commission','action']
    const data = worker.map((driver) =>{
      return{
        transaction: driver.transaction,
        name: driver.name,
        date: driver.date,
        amount: driver.amount,
        status: driver.status,
        commission: driver.commission,
      }
    })
    return (
      <>
      <br/>
      <h3>Drivers Payment</h3>
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
                    'status':
                    (item)=>(
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
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

                        
                          <DialogTitle id="form-dialog-title">Edit Payment of Drivers</DialogTitle> 
                          <form onSubmit={(e)=>updateDriver(e)}>
                          <DialogContent>
                            <DialogContentText>
                            In this section you can change the payment status and other characteristics regarding the drivers' pay
                            </DialogContentText>

                            <div className={classes.root}>
                            
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Transaction"
                              defaultValue={indice ? (indice.transaction):("")}
                              onChange = {(e)=>setIndice({...indice,transaction: e.target.value})}
                              type="text"
                              disabled
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Name ..."
                              defaultValue={indice ? (indice.name):("")}
                              onChange = {(e)=>setIndice({...indice,name: e.target.value})}
                              type="text"
                              fullWidth
                              disabled
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Date"
                              defaultValue={indice ? (indice.date):("")}
                              onChange = {(e)=>setIndice({...indice,date: e.target.value})}
                              type="date"
                              fullWidth
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Amount"
                              defaultValue={indice ? (indice.amount):("")}
                              onChange = {(e)=>setIndice({...indice,amount: e.target.value})}
                              InputProps={ {startAdornment: <InputAdornment position="start">$</InputAdornment>,}}
                              type="number"
                              fullWidth
                            />
                            <TextField
                              select
                              label="Status"
                              value={ValuesofPayment}
                              onChange={handleChange}
                            >
                              {ValuesofPay.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>

                            <TextField
                              autoFocus
                              margin="dense"
                              label="Commission"
                              defaultValue={indice ? (indice.commission):("")}
                              onChange = {(e)=>setIndice({...indice,commission: e.target.value})}
                              InputProps={ {endAdornment: <InputAdornment position="end">%</InputAdornment>,}}
                              type="number"
                              
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
                            <Button type="submit" value="Confirm"onClick={(e)=>updateDriver(e)} color="primary" autoFocus>
                              Confirm
                            </Button>
                          </DialogActions>
                        </Dialog>
 {/* popup */}
                          </form>
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