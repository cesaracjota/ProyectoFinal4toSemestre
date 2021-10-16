import React from "react";
import { useSelector } from "react-redux";
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components

import Header from "../home/components/Header/Header.js";
import HeaderLinkslogin from "../home/components/Header/HeaderLinkslogin.js";

import styles from "../../../assets/jss/material-kit-react/views/loginPage.js";

import image from "../../../assets/img/bg7.jpg";
import Logininput from "./pages/Logininput.js";
import ForgotPass from "./pages/ForgotPass.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const classes = useStyles();
  const { ...rest } = props;
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="ChapaTuCombi"
        rightLinks={<HeaderLinkslogin />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <HashRouter>
          <Switch>
            <Route path="/login/forgot-password" component={ForgotPass}></Route>
            <Route path="/login" component={Logininput}></Route>

          </Switch>
        </HashRouter>
      </div>
    </div>
  );
}
