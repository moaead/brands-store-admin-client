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
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import {EditorState, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import axios from "axios";
import FormCheckbox from "../../components/FormInputs/FormCheckbox";

export function AddOrEditProductDialog({open, data, handleClose, onSubmit}) {
    let schema = yup.object().shape({
        barCode: yup.string().required(),
        name: yup.string().required(),
        arabicName: yup.string().required().nullable(),
        productCategoryId: yup.string().required(),
        companyId: yup.string().required(),
        image: yup.string().nullable().required("Required"),
    });

    const {register, reset, unregister, control, handleSubmit, errors, getValues, setValue} = useForm({
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
    const [categories, setCategories] = useState([]);

    const getData = () => {
        return axios.get("/Categories/Get").then((res) => {
            setCategories(res.data);
        });
    };

    console.log(categories);
    React.useEffect(() => {
        getData();
    }, [])
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={'md'}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <DialogTitle id="form-dialog-title">Product</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                inputRef={register}
                                autoFocus
                                name="barCode"
                                id="barCode"
                                label="Bar Code"
                                type="barCode"
                                error={!!errors.barCode}
                                helperText={errors.barCode && errors.barCode.message}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                inputRef={register}
                                autoFocus
                                name="name"
                                id="name"
                                label="Name"
                                type="name"
                                error={!!errors.name}
                                helperText={errors.name && errors.name.message}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                inputRef={register}
                                autoFocus
                                name="arabicName"
                                id="arabicName"
                                label="Arabic Name"
                                type="arabicName"
                                error={!!errors.arabicName}
                                helperText={errors.arabicName && errors.arabicName.message}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <Controller
                                name="productCategoryId"
                                control={control}
                                defaultValue={null}
                                render={({onChange, value}) => <FormControl fullWidth>
                                    {!value && <InputLabel>Category</InputLabel>}
                                    <Select
                                        onChange={e => {
                                            onChange(e.target.value)
                                        }}
                                        value={value}
                                        placeholder="Category"
                                        autoFocus
                                        name="productCategoryId"
                                        id="productCategoryId"
                                        label="Category"
                                        type="productCategoryId"
                                        error={!!errors.productCategoryId}
                                        helperText={errors.productCategoryId && errors.productCategoryId.message}
                                        fullWidth
                                    >
                                        {categories.map(t => (
                                            <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                }
                            />

                        </Grid>
                        <Grid item>
                            <Controller
                                name="companyId"
                                control={control}
                                defaultValue={null}
                                render={({onChange, value}) =>
                                    <FormControl fullWidth>
                                        {!value && <InputLabel>Company</InputLabel>}
                                        <Select
                                        onChange={e => {
                                            onChange(e.target.value)
                                        }}
                                        value={value}
                                        autoFocus
                                        placeholder="Company"
                                        name="companyId"
                                        id="companyId"
                                        label="Company"
                                        type="companyId"
                                        error={!!errors.companyId}
                                        helperText={errors.companyId && errors.companyId.message}
                                        fullWidth
                                    >
                                        {[{
                                            id: 1,
                                            name: "Ulker"
                                        }, {
                                            id: 2,
                                            name: "Jouy & Co"
                                        }, {
                                            id: 3,
                                            name: "Twist and Drink"
                                        }].map(t => (
                                            <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                                }
                            />
                        </Grid>
                        <Grid item>

                            <FormCheckbox
                                register={register}
                                setValue={setValue}
                                autoFocus
                                name="isHidden"
                                id="isHidden"
                                title="Hidden"
                                fullWidth
                                initialValue={data.isHidden}
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