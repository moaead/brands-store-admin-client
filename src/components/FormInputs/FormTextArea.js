import React from "react";
import {ErrorMessage} from "@hookform/error-message";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import Danger from "../Typography/Danger";
import styles from "assets/jss/material-dashboard-react/components/formInputsStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(styles);

 const FormTextArea = ({register, errors, name, isRequired, placeholderDescription, title, errorMessage}) => {
     const styles = useStyles();
     return <div className={styles.textAreaField}>
         <InputLabel> {isRequired && <span className={styles.required}>*</span>} {title} </InputLabel>
        <TextareaAutosize   name={name} placeholder={placeholderDescription || title}   ref={register} className={styles.textArea} />
         <ErrorMessage errors={errors} name={name} render={({ message }) => <Danger>{message}</Danger>} message={errorMessage} />
    </div>
};

export default FormTextArea;