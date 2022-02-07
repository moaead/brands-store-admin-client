import React, {useState} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {ErrorMessage} from "@hookform/error-message";
import Danger from "../Typography/Danger";
import styles from "assets/jss/material-dashboard-react/components/formInputsStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(styles);
 const FormCheckbox = ({register, errors, name, setValue, title, errorMessage, initialValue}) => {

     const styles = useStyles();
     const checkboxChange =()=>{
         setCheckboxValue(!checkboxValue);
         setValue(name, !checkboxValue);
     };
     const [checkboxValue, setCheckboxValue] = useState(initialValue);
    return <div className={styles.checkboxWrapper}>
        <InputLabel>{title}</InputLabel>
        <Checkbox  name={name} placeholder={title} onChange={checkboxChange} inputRef={register} checked={checkboxValue} />
        <ErrorMessage errors={errors} name={name} render={({ message }) => <Danger>{message}</Danger> } message={errorMessage} />
    </div>
};

export default FormCheckbox;