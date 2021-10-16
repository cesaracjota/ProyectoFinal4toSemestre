import React, { lazy } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardGroup,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {

  CChartLine

} from '@coreui/react-chartjs'
import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
  return (
    <>
    <br></br>
    <h2>Welcome</h2>
    <br></br>
    <CCardGroup columns className = "cols-2" >
          <CCard>
        <CCardHeader>
          
        </CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: 'Drivers',
                backgroundColor: 'rgb(0,216,255,0.9)',
                data: [0, 0, 0, 0, 0, 0, 5]
              },
              {
                label: 'Vehicles',
                backgroundColor: 'rgb(228,102,81,0.9)',
                data: [0, 0, 0, 0, 0, 1, 10]
              }
              
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels="months"
          />
        </CCardBody>
      </CCard>
      <WidgetsDropdown />
      </CCardGroup>
      
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Coupons {'&'} Passengers </h4>
              <div className="small text-muted">June 2021</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download"/>
              </CButton>
              
            </CCol>
          </CRow>
          <MainChartExample style={{height: '300px', marginTop: '40px'}}/>
        </CCardBody>
      
      </CCard>
    </>
  )
}

export default Dashboard
