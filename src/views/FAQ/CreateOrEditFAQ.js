import React, {useEffect, useState} from "react";
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
import axios from "axios";
import FileView from "../../components/FileView/FileView";
import {Container, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import FormTextField from "../../components/FormInputs/FormTextField";
import {Controller, useForm} from "react-hook-form";
import FormTextArea from "../../components/FormInputs/FormTextArea";
import FileUpload from "../../components/FormInputs/FileUpload";
import FormEditor from "../../components/FormInputs/FormEditor";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import ReactEditor from "../../components/ReactEditor/ReactEditor";
import DropZone from "../../components/DropZone/DropZone";
import draftToHtml from "draftjs-to-html";
import {useLocation} from "react-router-dom"
import htmlToDraft from "html-to-draftjs";
import FormCheckbox from "../../components/FormInputs/FormCheckbox";


export default function CreateOrEditFAQ() {
    const location = useLocation();
    const episodeData = location?.state?.faq ?? {};
    const {description,englishDescription, ...eData} = episodeData;
    const {register, reset, unregister, control, handleSubmit, errors, setValue} = useForm({
        defaultValues: eData
    });
    console.log("data", episodeData);

const onSubmit=(data)=>{
    console.log("html",data)
};
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader>
                        FAQ
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={8}>
                                <Grid md={6} item spacing={3}>
                                    <FormTextField
                                        register={register({
                                            required: true
                                        })}
                                        name="englishQuestion"
                                        title="question (English)"
                                        type="text"
                                        errors={errors}
                                        errorMessage="Question must not be empty"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid md={6} item spacing={3}>
                                    <FormTextField
                                        register={register({
                                            required: true
                                        })}
                                        name="question"
                                        title="question (Arabic)"
                                        type="text"
                                        errors={errors}
                                        errorMessage="Question must not be empty"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid md={6} item spacing={3}>
                                    <FormTextField
                                        register={register({
                                            required: true
                                        })}
                                        name="englishAnswer"
                                        title="Answer (English)"
                                        type="text"
                                        errors={errors}
                                        errorMessage="Answer must not be empty"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid md={6} item spacing={3}>
                                    <FormTextField
                                        register={register({
                                            required: true
                                        })}
                                        name="answer"
                                        title="Answer (Arabic)"
                                        type="text"
                                        errors={errors}
                                        errorMessage="Answer name must not be empty"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item>
                                    <Button type="submit" variant="contained" color="primary">
                                        submit
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
