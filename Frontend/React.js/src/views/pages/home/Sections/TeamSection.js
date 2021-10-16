import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";

import styles from "../../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";



import busOne from "../../../../assets/img/bus/canarios.jpg"
import busTwo from "../../../../assets/img/bus/octubre.jpg"
import busThree from "../../../../assets/img/bus/cotaspa.jpg"



const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Empresas Afiliadas:</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={busOne} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Los Canarios
                <br />
                <small className={classes.smallTitle}>Transporte Público</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Empresa reconocida por sus transportes
                  públicos de color plomo, que tiene
                  una ruta conocida por el público.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={busTwo} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                3 de Octubre
                <br />
                <small className={classes.smallTitle}>Transporte Público</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Empresa reconocida por sus transportes
                  públicos de color azul, que tiene
                  una ruta conocida por el público.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={busThree} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Cotaspa
                <br />
                <small className={classes.smallTitle}>Transporte Público</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Empresa reconocida por sus transportes
                  públicos de color Turquesa claro, que tiene
                  una ruta conocida por el público.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>
      </div>
    </div>
  );
}
