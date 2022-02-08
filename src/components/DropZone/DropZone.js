import React, {useMemo, useState} from "react";
import {useDropzone} from "react-dropzone";
import FileView from "../FileView/FileView";
import {defaultImageFolder} from "../../index";

export default function DropZone({onChange, value, error, helperText, accept, multiple}) {
    const [files, setFiles] = useState([]);
    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    };

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: accept,
        multiple: multiple,
        onDrop: acceptedFiles => {
            console.log("acceptedFiles", acceptedFiles);
            let reader = new FileReader();
            reader.readAsDataURL(acceptedFiles[0]);
            reader.onload = function () {
                onChange(reader.result);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };

            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
console.log({onChange, value, error, helperText, accept, multiple})
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: error ? "red" : '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const activeStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept,
        error
    ]);

    return (
        <div>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag or click here</p>
                }
            </div>
            {error && <span style={{color: "red", fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.66}}>{helperText}</span>}
            <aside>
                {files.length > 0 && <div style={thumb}>
                    <div style={thumbInner}>
                        <img
                            src={files[0].preview}
                            style={img}
                            alt="preview"/>
                    </div>
                </div>}

                {files.length <= 0 && value && <div style={thumb}>
                    <div style={thumbInner}>
                        <img
                            src={defaultImageFolder + value}
                            style={img}
                            alt="preview"/>                    </div>
                </div>}
            </aside>

        </div>
    );
}