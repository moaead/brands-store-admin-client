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
import htmlToDraft from "html-to-draftjs";

export function AddOrEditMojawaratDialog({open, data, handleClose, onSubmit}) {
    let schema = yup.object().shape({
        title: yup.string().required(),
        image: yup.string().required().nullable()
    });

    const {register, reset, unregister, control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    React.useEffect(() => {
        if(!open){
            return;
        }

        let body = EditorState.createEmpty();
        if (data.body) {
            const blocksFromHtml = htmlToDraft(data.body);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            body = EditorState.createWithContent(contentState);
        }
        reset({
            ...data,
            body
        });
    }, [open]);
    const handleOnSubmit = (values) => {
        const html = draftToHtml(convertToRaw(values.body.getCurrentContent()));
        onSubmit({
            ...data,
            ...values,
            body: html
        })
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={'md'}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <DialogTitle id="form-dialog-title">Mojawara</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" spacing={2}>

                        <Grid item>
                            <TextField
                                inputRef={register}
                                autoFocus
                                name="title"
                                id="title"
                                label="Title"
                                type="title"
                                error={!!errors.title}
                                helperText={errors.title && errors.title.message}
                                fullWidth
                            />
                        </Grid>
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

                        <Grid item>
                            <Controller
                                name="body"
                                control={control}
                                defaultValue={EditorState.createEmpty()}
                                render={({onChange, value}) => <ReactEditor onChange={onChange} value={value}

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