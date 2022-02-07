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
import {Container, Grid} from "@material-ui/core";
import ReactEditor from "../../components/ReactEditor/ReactEditor";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

export default function Login({onLogin, error}) {
    console.log("TT", onLogin);
    const {register, reset, unregister, control, handleSubmit, errors} = useForm({});
    const onSubmit = (values) => {
        onLogin(values);
        console.log(onLogin);
    };

    return (
        <Container>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader>
                            Login
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <TextField
                                            inputRef={register}
                                            autoFocus
                                            name="password"
                                            id="password"
                                            label="Password"
                                            type="password"
                                            error={!!error}
                                            helperText={error && error.message}
                                            fullWidth
                                        />

                                    </Grid>
                                    <Grid item>
                                        <Button type="submit" variant="contained" color="primary">
                                            Login
                                        </Button>
                                    </Grid>

                                </Grid>
                            </form>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </Container>
    );
}
