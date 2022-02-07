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
import axios from "axios";

function getYoutubeId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

export function AddOrEditVideo({open, data, handleClose, onSubmit}) {
    let schema = yup.object().shape({
        link: yup.string().required(),
    });

    const [formData, setFormData] = useState({})
    const {register, reset, getValues, setValue, unregister, control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    React.useEffect(() => {
        if (!open) {
            return;
        }
        reset({
            ...data
        });
    }, [open]);
    const handleOnSubmit = (values) => {
        onSubmit({
            ...data,
            ...values
        });
    };
    const updateFormFromVideoUrl = () => {
        const {link} = getValues();
        const youtubeId = getYoutubeId(link);
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${youtubeId}&key=AIzaSyBzJkA8R0cWA1Lm3KFRMFfSLdMxAsdmwg0`, {
            withCredentials: false
        }).then(res => {
            if (!res.data.items || res.data.items.length <= 0) {
                return;
            }
            let {definition, duration} = res.data.items[0].contentDetails;
            const {title} = res.data.items[0].snippet;
            duration = duration.replace("PT", "").replace("S", "").split("M");
            duration = `${duration[0].length === 1 ? `0${duration[0]}` : duration[0]}:${duration[1].length === 1 ? `0${duration[1]}` : duration[1]}`;
            const quality = definition.toUpperCase();
            setValue("title", title);
            setValue("duration", duration);
            setValue("quality", quality);
            setFormData(getValues);
        })
    };
    const values = {
        ...data,
        ...getValues()
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={'md'}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <DialogTitle id="form-dialog-title">Video</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" spacing={2}>

                        <Grid item>
                            <TextField
                                inputRef={register}
                                autoFocus
                                defaultValue=""
                                name="link"
                                id="link"
                                label="Youtube URL"
                                error={!!errors.link}
                                helperText={errors.link && errors.link.message}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <Button color="primary" variant="contained"
                                    onClick={updateFormFromVideoUrl}>Get
                                Info</Button>
                        </Grid>
                        <Grid item>
                            <TextField
                                inputRef={register}
                                name="title"
                                id="title"
                                InputLabelProps={{shrink: !!values.title}}
                                label="Title"
                                error={!!errors.title}
                                helperText={errors.title && errors.title.message}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                inputRef={register}
                                name="quality"
                                id="quality"
                                label="Quality"
                                InputLabelProps={{shrink: !!values.quality}}
                                error={!!errors.quality}
                                helperText={errors.quality && errors.quality.message}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                inputRef={register}
                                name="duration"
                                id="duration"
                                label="Duration"
                                InputLabelProps={{shrink: !!values.duration}}
                                error={!!errors.duration}
                                helperText={errors.duration && errors.duration.message}
                                fullWidth
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