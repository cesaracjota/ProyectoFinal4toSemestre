/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import { Route, useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";


// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.js";
import Button from "../../components/CustomButtons/Button.js";


import styles from "../../../../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [show, setShow] = useState(true);

  return (

    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to='/login' className={classes.styleLinkTo}>
        <Button
          color="transparent"
          target="_blank"
          link={true}
          className={classes.navLink}
        >
          Login
        </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to='/register' className={classes.styleLinkTo}>
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}

        >
         Register
        </Button>
        </Link>
      </ListItem>

    </List>

  );
}
