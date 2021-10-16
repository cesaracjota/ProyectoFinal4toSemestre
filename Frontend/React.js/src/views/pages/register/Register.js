import React, {useState,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// Validate
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// @material-ui/icons

// core components
import Header from "../home/components/Header/Header.js";

import GridContainer from "../home/components/Grid/GridContainer.js";
import GridItem from "../home/components/Grid/GridItem.js";
import Button from "../home/components/CustomButtons/Button.js";
import Card from "../home/components/Card/Card.js";
import CardBody from "../home/components/Card/CardBody.js";

import CardFooter from "../home/components/Card/CardFooter.js";


import styles from "../../../assets/jss/material-kit-react/views/loginPage.js";

import { register } from "../../../actions/auth";

import image from "../../../assets/img/bg7.jpg";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  //verificaciones
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };
 //fin verificaciones

 //movimiento components
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
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


        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>

              <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                <div>
                  <Link to={"/login"} className={classes.link}>
                   <Button color="primary" size="lg" simple>
                    Register
                    </Button>
                  </Link>
                
                  <CardBody>
                    
                  <label htmlFor="username">Email</label>
                  <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, validEmail]}
                  />

                <label htmlFor="email">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, vusername]}
                />

                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
                    {/* <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    /> */}
                    {/* <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Lock className={classes.inputIconsColor}>
                            </Lock>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    /> */}

                    
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                  {/* <Link to="/admin">
                    <Button simple color="primary" size="lg" >
                      Iniciar Sesion
                    </Button>
                    </Link> */}
                    <button className="btn btn-primary btn-block">Sign Up</button>
                  </CardFooter>
                  </div>
                  )}
                {message && (
                <div className="form-group">
                  <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                  </div>
                  {/* <Link to={"/"} className={classes.link}>
                   <Button color="dark" size="lg" simple>
                    Home
                    </Button>
                  </Link> */}
                </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
