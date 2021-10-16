import React, { Suspense } from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
// routes config
import { CContainer} from '@coreui/react'

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));
const Map = React.lazy(() => import('../views/map/Maps'));
const Routes = React.lazy(() => import('../views/map/Route'));
const Drivers = React.lazy(() => import('../views/drivers/Drivers'))
const AddDriver = React.lazy(() => import('../views/drivers/AddNewDriver'))
const Passengers = React.lazy(() => import('../views/passengers/Passengers'))
const DriverPayment = React.lazy(() => import('../views/drivers/DriverPayment'))
const Vehicles = React.lazy(() => import('../views/vehicles/Vehicles'))
const AddVehicle = React.lazy(() => import('../views/vehicles/AddNewVehicle'))
const Coupons = React.lazy(() => import('../views/coupons/CouponList'))
const CouponGenenate = React.lazy(() => import('../views/coupons/CouponGeneration'))
const Fares = React.lazy(() => import('../views/fares/FareList'))
const AddFares = React.lazy(() => import('../views/fares/AddFare'))
const ActiveTrips = React.lazy(() => import('../views/trips/ActiveTrips'))
const BookedTrips = React.lazy(() => import('../views/trips/BookedTrips'))
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <>
    <Route path="/dashboard/maps" component={Map}/>
    <Route path="/dashboard/route" component={Routes}/>
    {/* <main className="c-main"> */}
    <main>
      
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            <Route path="/dashboard/trips/book" component={BookedTrips}/>
            <Route path="/dashboard/trips/active" component={ActiveTrips}/>
            <Route path="/dashboard/vehicle/info" component={AddVehicle}/>
            <Route path="/dashboard/vehicle/all" component={Vehicles}/>
            <Route path="/dashboard/passengers/info" component={Passengers}/>
            <Route path="/dashboard/drivers/payment" component={DriverPayment}/>
            <Route path="/dashboard/driver/add" component={AddDriver}/>
            <Route path="/dashboard/drivers/all" component={Drivers}/>
            <Route path="/dashboard/coupons/all" component={Coupons}/>
            <Route path="/dashboard/coupons/add" component={CouponGenenate}/>
            <Route path="/dashboard/fares/all" component={Fares}/>
            <Route path="/dashboard/fares/add" component={AddFares}/>
            <Route path="/dashboard/" exact component={Dashboard}/>
          </Switch>
        </Suspense>
      </CContainer>
    </main>
    </>
  )
}

export default React.memo(TheContent)
