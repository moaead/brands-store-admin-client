import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import React, {useMemo, useState} from "react";
import DialogContent from "@material-ui/core/DialogContent";
import {useDropzone} from "react-dropzone";
import ReactEditor from "../../components/ReactEditor/ReactEditor";
import DropZone from "../../components/DropZone/DropZone";
import {Grid} from "@material-ui/core";
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import {EditorState, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export function AddOrEditSliderDialog({open, data, handleClose, onSubmit}) {
    let schema = yup.object().shape({
        image: yup.string().required().nullable()
    });

    const {register, reset, unregister, control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    React.useEffect(() => {
        if (!open) {
            return;
        }
        reset({
            ...data,
        });
    }, [open]);
    const handleOnSubmit = (values) => {
        onSubmit({
            ...data,
            ...values,
        })
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={'md'}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <DialogTitle id="form-dialog-title">Slide</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Controller
                                name="image"
                                control={control}
                                defaultValue={null}
                                render={({onChange, value}) => <DropZone onChange={onChange} value={value}
                                                                         error={!!errors.image}
                                                                         helperText={errors.image && errors.image.message}
                                />}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Submit
                    </Button>
                </DialogActions>

            </form>
        </Dialog>

    )
}