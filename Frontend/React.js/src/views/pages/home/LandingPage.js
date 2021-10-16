import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "./components/Header/Header.js";
// // import Footer from "components/Footer/Footer.js";
import GridContainer from "./components/Grid/GridContainer.js";
import GridItem from "./components/Grid/GridItem.js";
import Button from "./components/CustomButtons/Button.js";
import HeaderLinks from "./components/Header/HeaderLinks.js";
import Parallax from "./components/Parallax/Parallax.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPage.js";

// // Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection";


const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {

  const { user: currentUser } = useSelector((state) => state.auth);

  const classes = useStyles();
  const { ...rest } = props;

if (currentUser) {
  return <Redirect to="/dashboard" />;
}
const changeScroll = () => window.scroll(0,400)

  return (
    <div>

      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Chapa tu Combi"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "dark"
        }}
        {...rest}
      />

      <Parallax filter image={require("../../../assets/img/Arequipa1.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Bienvenido</h1>
              <h4>
                Empresa lucrada para
                beneficios de empresas de tránsito
                como también para el público
                en general.
                Cualquier consulta sobre nuestra
                empresa apriete el boton
                de mas información.


              </h4>
              <br />
              <Button
                color="warning"
                size="lg"
                onClick={changeScroll}
              >
                <i className="fas fa-play" />
                Mas Información
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <div className="layout-main">


            </div>
      <br />
      <br />
    </div>

  );
}
