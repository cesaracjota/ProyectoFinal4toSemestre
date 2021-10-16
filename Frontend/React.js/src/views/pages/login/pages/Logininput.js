import React, {useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { isEmail } from "validator";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../../../../actions/auth";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// @material-ui/icons
// core components

import GridContainer from "../../home/components/Grid/GridContainer.js";
import GridItem from "../../home/components/Grid/GridItem.js";
import Button from "../../home/components/CustomButtons/Button.js";
import Card from "../../home/components/Card/Card.js";
import CardBody from "../../home/components/Card/CardBody.js";

import CardFooter from "../../home/components/Card/CardFooter.js";

import styles from "../../../../assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

//authenticacion de campos
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


const Logininput = (props) => {

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    
    const classes = useStyles();

    setTimeout(function() {
        setCardAnimation("");
      }, 700);
      //cosas del login
      const form = useRef();
      const checkBtn = useRef();
    
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
    
      const { isLoggedIn } = useSelector(state => state.auth);
      const { message } = useSelector(state => state.message);
    
      const dispatch = useDispatch();
    
      const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };
    
      const handleLogin = (e) => {
        e.preventDefault();
    
        setLoading(true);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
          dispatch(login(username, password))
            .then(() => {
              props.history.push("/dashboard");
              window.location.reload();
            })
            .catch(() => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      };
    
      if (isLoggedIn) { 
        return <Redirect to="/dashboard" />;
      }

    return (
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                
                <Form onSubmit={handleLogin} ref={form}>

                  <Link to={"/login"} className={classes.link}>
                   <Button color="transparent" size="lg" simple>
                    Login
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
                 <label htmlFor="password">Password</label>
                  <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required]}
                  />   
                  </CardBody>

                  <CardFooter className={classes.cardFooter}>
                    <button className="btn btn-primary btn-block" disabled={loading}>
                      {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Login</span>
                    </button>
                  </CardFooter>
                  {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                    </div>
                  )}
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
    );

};


export default Logininput;