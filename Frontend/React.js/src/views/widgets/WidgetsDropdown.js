import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  CWidgetDropdown,
  CRow,
  CCol,

} from '@coreui/react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import {retrieveCoupons} from '../../actions/coupons'
import {retrieveWorkers} from '../../actions/workers'
import {retrievePassengers} from '../../actions/passengers'
import {retrieveVehicles} from '../../actions/vehicle'
const WidgetsDropdown = () => {
  const dispatch = useDispatch()
  const coupons = useSelector(store => store.coupons)
  const workers = useSelector(store => store.workers)
  const passengers = useSelector(store => store.passengers)
  const vehicles = useSelector(store => store.vehicles)

  useEffect(() => {
    dispatch(retrieveCoupons())
    dispatch(retrieveWorkers())
    dispatch(retrievePassengers())
    dispatch(retrieveVehicles())
  },[dispatch])
  return (
    <CRow>
      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-primary"
          header={workers.length.toString()}
          text="Workers"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Workers"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-info"
          header={vehicles.length.toString()}
          text="Vehicles"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="Vehicles"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-warning"
          header={passengers.length.toString()}
          text="Passengers"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Passengers"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-danger"
          header={coupons.length.toString()}
          text="Coupons"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="rgb(250, 152, 152)"
              label="Coupons"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown