import React, {useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from "material-table";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import Dialog from "@material-ui/core/Dialog";
import draftToHtml from "draftjs-to-html";
import {convertToRaw, EditorState} from "draft-js";
import {Grid} from "@material-ui/core";
import ReactEditor from "../../components/ReactEditor/ReactEditor";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

export default function Settings() {
    let {register, reset, unregister, control, handleSubmit, errors} = useForm({});
    const [backendErrors, setBackendErrors] = useState({});
    const onSubmit = (values) => {
        console.log(values);

        axios.post("/auth/ChangePassword", values).then((res) => {
            if (!res.data.succeeded) {
                setBackendErrors({
                    oldPassword: {
                        message: "Incorrect Password"
                    }
                })
            }
        });

    };

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader>
                        Change Password
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        inputRef={register}
                                        autoFocus
                                        name="oldPassword"
                                        id="oldPassword"
                                        label="Old Password"
                                        type="password"
                                        error={!!errors.oldPassword || !!backendErrors.oldPassword}
                                        helperText={(errors.oldPassword && errors.oldPassword.message) || (backendErrors.oldPassword && backendErrors.oldPassword.message)}
                                        fullWidth
                                    />

                                </Grid>
                                <Grid item>
                                    <TextField
                                        inputRef={register}
                                        name="newPassword"
                                        id="newPassword"
                                        label="New Password"
                                        type="password"
                                        error={!!errors.newPassword}
                                        helperText={errors.newPassword && errors.newPassword.message}
                                        fullWidth
                                    />

                                </Grid>
                                <Grid item>
                                    <TextField
                                        inputRef={register}
                                        name="confirmNewPassword"
                                        id="confirmNewPassword"
                                        label="Confirm New Password"
                                        type="password"
                                        error={!!errors.confirmNewPassword}
                                        helperText={errors.confirmNewPassword && errors.confirmNewPassword.message}
                                        fullWidth
                                    />

                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </Grid>

                            </Grid>
                        </form>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
