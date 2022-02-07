import React, {CSSProperties, useEffect} from "react";
import cn from "classnames";
import {ErrorMessage} from "@hookform/error-message";
import Select from "react-select";
import Danger from "../Typography/Danger";
import styles from "assets/jss/material-dashboard-react/components/formInputsStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(styles);

 const FormSelect = ({register, errors, name, options, setValue, onChangeCallback, showDefaultValue, isRequired, title, errorMessage}) => {
     const styles = useStyles();

     const handleUserTypeChange =(selectedItem) => {
         setValue(name, selectedItem.value);
         onChangeCallback();
     };
     useEffect(()=>{
        showDefaultValue && handleUserTypeChange(options[0]);
     },[]);


     return <div className={styles.selectFieldWrapper}>
         <InputLabel> {isRequired && <span className={styles.required}>*</span>} {title} </InputLabel>
        <Select id={name}
                options={options}
                placeholder={title}
                name={name}
                ref={register}
                defaultValue={ showDefaultValue ? options[0] : undefined}
                onChange={handleUserTypeChange} />
         <ErrorMessage errors={errors} name={name} render={({message}) => <Danger>{message}</Danger> }
                      message={errorMessage}/>
    </div>
};
FormSelect.defaultProps = { onChangeCallback:()=> undefined };
export default FormSelect;