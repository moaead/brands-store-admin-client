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


export default function CreateOrEditNews() {
    const location = useLocation();
    const newsData = location?.state?.news ?? {};
    const {content,englishContent, ...eData} = newsData;
    const {register, reset, unregister, control, handleSubmit, errors, setValue, setError   } = useForm({
        defaultValues: eData
    });
    console.log("data", newsData);


    const textToHtmlEditor =(field, name)=> {
        if (field) {
            const blocksFromHtml = htmlToDraft(field);
            const {contentBlocks, entityMap} = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setValue(name, EditorState.createWithContent(contentState));
        }

    };
    useEffect(()=>{
        textToHtmlEditor(newsData.content, 'content');
        textToHtmlEditor(newsData.englishContent, "englishContent");
    },[]);

    const onSubmit=(data)=>{
        if(!data.media){
            console.log("set error")
            setError("media", "test")
        }
        const description = draftToHtml(convertToRaw(data.content.getCurrentContent()));
        const eDescription = draftToHtml(convertToRaw(data.englishContent.getCurrentContent()));
        console.log("html",description, eDescription, data)
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
                                        name="englishSubject"
                                        title="Subject (English)"
                                        type="text"
                                        errors={errors}
                                        errorMessage="Subject must not be empty"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid md={6} item spacing={3}>
                                    <FormTextField
                                        register={register({
                                            required: true
                                        })}
                                        name="subject"
                                        title="Subject (Arabic)"
                                        type="text"
                                        errors={errors}
                                        errorMessage="Subject must not be empty"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid md={6} item spacing={3}>
                                    <FormEditor
                                        control={control}
                                        name="englishContent"
                                        title="Content (English)"
                                        errors={errors}
                                        errorMessage="Content must not be empty"
                                        isRequired
                                    />
                                </Grid>
                                <Grid md={6} item spacing={3}>
                                    <FormEditor
                                        control={control}
                                        name="content"
                                        title="Content (Arabic)"
                                        errors={errors}
                                        errorMessage="Content must not be empty"
                                        isRequired
                                    />
                                </Grid>

                                <Grid md={6} item>
                                    <FileUpload
                                        register={register({required: true, name: "media"})}
                                        setValue={setValue}
                                        name="media"
                                        errors={errors}
                                        errorMessage="Media must not be empty"
                                        title="Media"
                                    />
                                </Grid>
                                <Grid md={12} item>
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
