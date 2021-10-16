import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Live Map',
    to: '/dashboard/maps',
    icon: 'cil-map',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Trip',
    route: '/dashboard/base',
    icon: <CIcon name='cil-bus-alt' customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Active Trips',
        to: '/dashboard/trips/active',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Route Map',
        to: '/dashboard/route',
      },
    ],
  },
   {
    _tag: 'CSidebarNavDropdown',
    name: 'Drivers',
    route: '/dashboard/base',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Drivers',
        to: '/dashboard/drivers/all',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Driver',
        to: '/dashboard/driver/add',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Driver Payment',
        to: '/dashboard/drivers/payment',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Passengers',
    to: '/dashboard/passengers/info',
    icon: <CIcon name='cil-contact' customClasses="c-sidebar-nav-icon"/>,
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Vehicle',
    route: '/dashboard/base',
    icon: <CIcon name='cil-car-alt' customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Vehicle Details',
        to: '/dashboard/vehicle/info',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'View All Vehicle',
        to: '/dashboard/vehicle/all',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Coupons',
    route: '/dashboard/base',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Coupon Generation',
        to: '/dashboard/coupons/add',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Coupon List',
        to: '/dashboard/coupons/all',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Fare Management',
    route: '/dashboard/base',
    icon: <CIcon name='cil-cash' customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Fare',
        to: '/dashboard/fares/add',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Fail List',
        to: '/dashboard/fares/all',
      },
    ],
    
  },
]

export default _nav
