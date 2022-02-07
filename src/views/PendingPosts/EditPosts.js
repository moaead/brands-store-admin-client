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


export default function EditPosts() {
    const location = useLocation();
    const postData = location?.state?.post ?? {};
    const {content,englishContent, ...eData} = postData;
    const {register, reset, unregister, control, handleSubmit, errors, setValue, setError} = useForm({
        defaultValues: eData
    });
    console.log("data", errors);


    const textToHtmlEditor =(field, name)=> {
        if (field) {
            const blocksFromHtml = htmlToDraft(field);
            const {contentBlocks, entityMap} = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setValue(name, EditorState.createWithContent(contentState));
        }

    };
    useEffect(()=>{
        textToHtmlEditor(postData.content, 'content');
    },[]);

    const onSubmit=(data)=>{
        if(!data.media){
            setError("media", "test")
        }
        const description = draftToHtml(convertToRaw(data.content.getCurrentContent()));
        console.log("html",description, description, data)
    };
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader>
                        Post
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={8}>
                                <Grid md={7} item spacing={3}>
                                    <FormEditor
                                        control={control}
                                        name="content"
                                        title="Description"
                                        errors={errors}
                                        errorMessage="Content must not be empty"
                                        isRequired
                                    />
                                </Grid>
                                <Grid md={6} item>
                                    <FileUpload
                                        setValue={setValue}
                                        register={register({required: true,  name: "media" })}
                                        name="media"
                                        errors={errors}
                                        errorMessage= "Media must not be empty"
                                        title="Media"
                                        viewFiles={postData.media ?? []}
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
