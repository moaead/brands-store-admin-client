import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Danger from "../Typography/Danger";
import {ErrorMessage} from "@hookform/error-message";
import styles from "assets/jss/material-dashboard-react/components/formInputsStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(styles);
 const FormTextField = ({type, register, errors, name, isRequired, title, errorMessage, fullWidth}) => {
     const styles = useStyles();

     return <div className={styles.textField}>
         <TextField
             inputRef={register}
             name={name}
             id={name}
             label={title}
             type={type}
             error={!!(errors && errors[name])}
             helperText={(errors && errors[name]) && errorMessage}
             fullWidth={fullWidth}
             />
     </div>
};

export default FormTextField;