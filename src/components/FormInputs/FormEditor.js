import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Danger from "../Typography/Danger";
import {ErrorMessage} from "@hookform/error-message";
import styles from "assets/jss/material-dashboard-react/components/formInputsStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ReactEditor from "../ReactEditor/ReactEditor";
import {Controller} from "react-hook-form";
import {convertToRaw, EditorState} from "draft-js";
import {Grid} from "@material-ui/core";
import draftToHtml from "draftjs-to-html";

const useStyles = makeStyles(styles);
 const FormEditor = ({ register, errors, name, title, errorMessage, control, isRequired}) => {
     const styles = useStyles();

     return <div className={styles.textField}>
         <InputLabel>{title}</InputLabel>
         <br/>
         <Controller
             name={name}
             id={name}
             control={control}
             rules={{validate:(value)=> {
                     const html = draftToHtml(convertToRaw(value.getCurrentContent()));

                     return !isRequired || html.length > 8;
                 }
             }}
             defaultValue={EditorState.createEmpty()}
             render={({onChange, value}) => <ReactEditor height={150} onChange={onChange} value={value} ref={register}

             />}
         />
         <ErrorMessage errors={errors} name={name} render={({ message }) => <Danger>{message}</Danger> } message={errorMessage} />
     </div>
};

export default FormEditor;