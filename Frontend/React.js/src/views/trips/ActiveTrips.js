import React, {useEffect} from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'

import LocationOnIcon from '@material-ui/icons/LocationOn';
import { orange } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import TripDataService from '../../service/tripsActive'


const Tables = (props) => {

    const [trips, setTrips] = React.useState([]);



    useEffect(() => {
      retrieveTrips();
    },[]);

    const retrieveTrips = () =>{
      TripDataService.getAll()
      .then((trips) =>{
        setTrips(trips.data)
      })
    }



      const fields = ['id',{key: 'photo', _style:{width: '7%'}}, 'driver','vehicle', 'license', 'position']
      const data = trips.filter(index => index).map((coupons, index) =>{
        
        return {
          id:  index+1,
          photo: coupons.photo,
          expired_date: coupons.expired_date,
          driver: coupons.name,
          vehicle: coupons.vehicle,
          license: coupons.license
        }
    })                                                                                                        
    
    return (
      <>
      <br/>
      <h3>Active Trips</h3>
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
                  'photo': 
                  (item)=>(
                    <td>
                      <Avatar src={'http://localhost:8000'+item.photo} />
                    </td>                
                  ), 
                    'position':
                    (item)=>(
                      
                      <td>
                        <IconButton 
                        size="small"
                        onClick={()=>props.history.push('/dashboard/maps')}
                         >
                          <LocationOnIcon style={{ fontSize: 15, color: orange[900] }} />
                        </IconButton>
                        
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