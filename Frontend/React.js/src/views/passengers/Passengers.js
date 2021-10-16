import React, {useEffect} from 'react'
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
import {
  retrievePassengers
} from "../../actions/passengers"



const Tables = () => {

    const passengers = useSelector(store => store.passengers);
    const dispatch = useDispatch();



    useEffect(() => {
      dispatch(retrievePassengers());
    },[dispatch]);


    const getBadge = status => {
        switch (status) {
          case 'Active': return 'success'
          case 'Inactive': return 'danger'
          default: return 'primary'
        }
      }

    const fields = ['name','mobile','email','trips', 'status']
    const data = passengers.map((passenger)=>{
      return{
        id: passenger.id,
        name: passenger.name,
        mobile: passenger.mobile,
        email: passenger.email,
        trips: passenger.trips,
        status: passenger.status
      }
    })
    return (
      <>
      <br/>
      <h3>All Passengers</h3>
      <br/>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
              </CCardHeader>
              <CCardBody>
              <CDataTable
                items={data}
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