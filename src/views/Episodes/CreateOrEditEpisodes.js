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


export default function CreateOrEditEpisodes() {
    const [data, setData] = useState([]);
    const isCancelled = React.useRef(false);
    const location = useLocation();
    const episodeData = location?.state?.episode ?? {};
    const {description,englishDescription, ...eData} = episodeData;
    const {register, reset, unregister, control, handleSubmit, errors, setValue} = useForm({
        defaultValues: eData
    });
    console.log("data", episodeData);

    const textToHtmlEditor =(field, name)=> {
        if (field) {
            const blocksFromHtml = htmlToDraft(field);
            const {contentBlocks, entityMap} = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setValue(name, EditorState.createWithContent(contentState));
        }

    };
    useEffect(()=>{

        textToHtmlEditor(episodeData.description, 'description');
        textToHtmlEditor(episodeData.englishDescription, "englishDescription");

    },[]);
const onSubmit=(data)=>{
    const description = draftToHtml(convertToRaw(data.description.getCurrentContent()));
    const eDescription = draftToHtml(convertToRaw(data.englishDescription.getCurrentContent()));
    console.log("html",description, eDescription, data)
};
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader>
                        Episode
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={8}>
                                <Grid md={6} item spacing={3}>
                                    <FormTextField
                                        register={register({
                                            required: true
                                        })}
                                        name="englishName"
                                        title="Episode Name(English)"
                                        type="text"
                                        errors={errors}
                                        errorMessage="episode name must not be empty"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid md={6} item spacing={3}>
                                    <FormTextField
                                        register={register({
                                            required: true
                                        })}
                                        name="name"
                                        title="Episode Name (Arabic)"
                                        type="text"
                                        errors={errors}
                                        errorMessage="episode name must not be empty"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid md={6} item spacing={3}>

                                        <FormTextField
                                            register={register({
                                                required: true
                                            })}
                                            name="englishSubTitle"
                                            title="Sub Title (English)"
                                            type="text"
                                            errors={errors}
                                            errorMessage="episode name must not be empty"
                                            fullWidth
                                        />
                                    </Grid>

                                <Grid md={6} item spacing={3}>
                                    <FormTextField
                                        register={register({
                                            required: true
                                        })}
                                        name="subTitle"
                                        title="Sub Title (Arabic)"
                                        type="text"
                                        errors={errors}
                                        errorMessage="episode sub title must not be empty"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid md={6} item spacing={3}>
                                <FormEditor
                                    control={control}
                                    name="englishDescription"
                                    title="Episode Description (English)"
                                    errors={errors}
                                    errorMessage="Episode description must not be empty"
                                    isRequired
                                />
                            </Grid>
                                <Grid md={6} item spacing={3}>
                                    <FormEditor
                                        control={control}
                                        name="description"
                                        title="Episode Description (Arabic)"
                                        errors={errors}
                                        errorMessage=" English Episode description must not be empty"
                                        isRequired
                                    />
                                </Grid>
                                <Grid md={12} item>
                                    <FormCheckbox
                                        name="isActive"
                                        title="Is active"
                                        errors={errors}
                                        setValue={setValue}
                                        register={register}
                                        initialValue={episodeData?.isActive ?? false}
                                    />
                                </Grid>
{/*                                <Grid md={6} item spacing={3}>
                                    <Controller
                                        name="episodeMedia"
                                        control={control}
                                        defaultValue={null}
                                        render={({onChange, value}) => <DropZone onChange={onChange} value={value}
                                                                                  multiple
                                                                                 error={!!errors.image}
                                                                                 helperText={errors.image && errors.image.message}
                                        />}
                                        />
                                </Grid>*/}
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
