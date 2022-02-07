import React, {useState} from "react";
import cn from "classnames";
import {ErrorMessage} from "@hookform/error-message";
import DatePicker from "react-datepicker";
import {Label} from "@material-ui/icons";
import Danger from "../Typography/Danger";
import styles from "assets/jss/material-dashboard-react/components/formInputsStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(styles);
 const FormDatePicker = ({register, errors, name, setValue, selectedDate, isRequired, title, errorMessage}) => {
     const [birthDate, setBirthDate] = useState<Date>(selectedDate);
     const styles = useStyles();

     const handleDateChange =(date) => {
         setBirthDate(date);
         setValue("birthDate", date);
     };

     return <div className={styles.datePickerForm}>
         <InputLabel> {isRequired && <span className={styles.required}>*</span>} {title} </InputLabel>
        <div className={styles.datePickerWrapper}>
            <DatePicker
                selected={birthDate}
                className={styles.datePicker}
                onChange={handleDateChange}
                name={name}
                dateFormat="dd/MM/yyyy"
                placeholderText={title}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                ref={register} />
        </div>
         <ErrorMessage errors={errors} name={name} render={({ message }) => <Danger>{message}</Danger> } message={errorMessage} />
    </div>
};

export default FormDatePicker;