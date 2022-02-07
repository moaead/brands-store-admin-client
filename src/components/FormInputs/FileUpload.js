import React, {useEffect, useState} from "react";
import Dropzone, {useDropzone} from "react-dropzone";
import FileView from "../FileView/FileView";
import {ErrorMessage} from "@hookform/error-message";
import Danger from "../Typography/Danger";
import InputLabel from "@material-ui/core/InputLabel";
import styles from "assets/jss/material-dashboard-react/components/fileUploadStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(styles);
const FileUpload = ({accept, maxSize, register, setValue, name, errors, title, errorMessage, viewFiles}) => {
    viewFiles = Array.isArray(viewFiles)? viewFiles : [viewFiles];
        const [files, setFiles] = useState(viewFiles.map(item=> ({...item, editFile: true, mediaChanged: false })));
    const styles = useStyles();
    const onDrop = acceptedFiles => {
       // setFiles(files=> [...files, [...acceptedFiles.map(file =>({...file, preview: URL.createObjectURL(file)})] )
        const accepted = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
    setFiles(accepted);
};
    const thumbs = files.map(file => {
        console.log("file map",  file);
        const type = file.editFile ? file.type : file.type.split("/")[0];
        const url = file.editFile ? file.url : file.preview;
        return <div key={file.name}>
            <FileView item={{url: url, type: type}} />
        </div>
    });

        useEffect( () => {
            // Make sure to revoke the data uris to avoid memory leaks
            console.log("files", files)
            setValue(name, files[0]);
        }, [files]);


  return <div >
        <InputLabel>{title}</InputLabel>
      <Dropzone onDrop={onDrop} maxSize={maxSize} inputRef={register} accept={accept} multiple>
          {({getRootProps, getInputProps}) => (
              <section className={styles.dropzoneContainer}>
                  <div {...getRootProps()} className={styles.dropzone}>
                      <input {...getInputProps()} />
                      <p>Drag or click here to select file</p>
                  </div>
                  <aside className ={styles.thumbsContainer}>
                      {thumbs}
                  </aside>
              </section>
          )}
      </Dropzone>
      <ErrorMessage errors={errors} name={name} render={({ message }) => <Danger>{message}</Danger>}  message={errorMessage}/>
  </div>

};

export default FileUpload;