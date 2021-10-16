import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import {
  TheContent,
  TheSidebar,
  TheHeader
} from './index'

const TheLayout = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Redirect to="/" />;
      }
  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
      </div>
    </div>
  )
}

export default TheLayout
