import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

import VerifiedUser from "@material-ui/icons/VerifiedUser";

// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import InfoArea from "../components/InfoArea/InfoArea.js";

import styles from "../../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Objetivo General</h2>
          <h5 className={classes.description}>
            Llegar a ser conocidos por todo Arequipa
            como una empresa de confianza, también de
            poder ayudar a las empresas de trasporte en
            reducir los errores y poder aumentar la
            rapidez de las funciones.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={6} sm={12} md={6}>
            <InfoArea
              title="Visión"
              description="LLegar a ser reconocidos por todo el país peruano, también implementar nuevas mejoras a nuestro proyecto."
              icon={VerifiedUser}
              iconColor="info"
              vertical
            />

          </GridItem>
          <GridItem xs={6} sm={12} md={6}>
            <InfoArea
              title="Misión"
              description="Garantizar la proteccion de información del usuario, también de ser conocidos por las empresas de transporte."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>

        </GridContainer>
      </div>

    </div>
  );
}
