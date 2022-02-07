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
import {ContentState, convertToRaw, EditorState} from "draft-js";
import {Grid} from "@material-ui/core";
import ReactEditor from "../../components/ReactEditor/ReactEditor";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import axios from "axios";
import htmlToDraft from "html-to-draftjs";

export default function AboutUs() {

    const {register, reset, unregister, control, handleSubmit, errors} = useForm({});
    const [aboutUsId, setAboutUsId] = useState(undefined);
    React.useEffect(() => {
        axios.get("/aboutUs/get").then(res => {
            if (res.data.body) {
                const blocksFromHtml = htmlToDraft(res.data.body);
                const {contentBlocks, entityMap} = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                reset({
                    body: EditorState.createWithContent(contentState)
                })
            }

            setAboutUsId(res.data.id);
        });
    }, []);
    const onSubmit = (values) => {
        const html = draftToHtml(convertToRaw(values.body.getCurrentContent()));
        axios.post("/aboutUs/UpdateAboutUs", {
            id: aboutUsId,
            body: html
        }).then(res => {
            setAboutUsId(res.data.id);
        })
    };

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Controller
                                        name="body"
                                        control={control}
                                        defaultValue={EditorState.createEmpty()}
                                        render={({onChange, value}) => <ReactEditor onChange={onChange} value={value}

                                        />}
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
