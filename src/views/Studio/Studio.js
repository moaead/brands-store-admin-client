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
import {AddOrEditStudioItemDialog} from "./AddOrEditStudioItemDialog";
import axios from "axios";

export default function Studio() {
    const isCancelled = React.useRef(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [columns, setColumns] = useState([
        {
            title: 'Image', field: 'imageOrVideo', render: (data) => {
                if(data.videoUrl){
                    return <a href={data.videoUrl}>{data.videoUrl}</a>;
                }
                return (
                    <img style={{
                        width: 60,
                        height: 60
                    }} src={data.imageOrVideo} alt="preview"/>
                );
            }
        },
    ]);

    const [data, setData] = useState([]);

    const getData = () => {
        return axios.get("/studio/get").then((res) => {
            if(isCancelled.current) return;
            setData(res.data);
        });
    };
    useEffect(() => {
        getData();
        return () => {
            isCancelled.current = true;
        };
    }, []);

    const [selectedStudioItem, setSelectedStudioItem] = useState({});

    const handleAddOrUpdate = (values) => {
        return axios.post("/studio/addOrUpdate", values).then((res) => {
        }).then(() => {
            setIsAddDialogOpen(false);
            getData();
        });
    };
    const handleDelete = (values) => {
        return axios.post("/studio/remove", values).then((res) => {
        }).then(() => {
            setIsAddDialogOpen(false);
            return getData();
        });
    };

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <AddOrEditStudioItemDialog open={isAddDialogOpen} handleClose={() => setIsAddDialogOpen(false)}
                                                   data={selectedStudioItem} onSubmit={handleAddOrUpdate}/>
                        <MaterialTable
                            title={"Studio"}
                            actions={[
                                {
                                    icon: 'add',
                                    tooltip: 'Add Row',
                                    isFreeAction: true,
                                    onClick: (event, rowData) => {
                                        setSelectedStudioItem({});
                                        setIsAddDialogOpen(true);
                                    }
                                },
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit Row',
                                    onClick: (event, rowData) => {
                                        console.log(rowData);
                                        setSelectedStudioItem(rowData);
                                        setIsAddDialogOpen(true);
                                    }
                                }
                            ]}

                            columns={columns}
                            data={data}
                            editable={{
                                onRowDelete: handleDelete
                            }}
                        />

                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
