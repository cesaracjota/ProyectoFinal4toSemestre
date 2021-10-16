import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from "react-router-dom";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components

import GridContainer from "../../home/components/Grid/GridContainer.js";
import GridItem from "../../home/components/Grid/GridItem.js";
import Button from "../../home/components/CustomButtons/Button.js";
import Card from "../../home/components/Card/Card.js";
import CardBody from "../../home/components/Card/CardBody.js";

import CardFooter from "../../home/components/Card/CardFooter.js";
import CustomInput from "../../home/components/CustomInput/CustomInput.js";

import styles from "../../../../assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);
const ForgotPass = () => {

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const classes = useStyles();
    setTimeout(function() {
        setCardAnimation("");
      }, 700);
    return (
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>


                   <Button color="transparent" size="lg" simple>
                    Forgot you password
                    </Button>


                  <CardBody>
                    <CustomInput
                      labelText="Email"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor}>
                            </Email>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                  <Link to="/admin">
                    <Button simple color="primary" size="lg" >
                      Send Message
                    </Button>
                    </Link>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
    );
};

export default ForgotPass;