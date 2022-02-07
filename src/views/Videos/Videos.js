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
import {AddOrEditVideo} from "./AddOrEditVideo";
import axios from "axios";

const columns = [
    {title: 'Title', field: 'title'},
    {
        title: 'Link', field: 'link', render: (data) => {
            return (
                <a href={data.link}>{data.link}</a>
            );
        }
    },
    {title: 'Quality', field: 'quality'},
    {title: 'Duration', field: 'duration'},
];

export default function Videos() {
    const isCancelled = React.useRef(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [data, setData] = useState([]);

    const getData = () => {
        return axios.get("/videos/get").then((res) => {
            if (isCancelled.current) return;
            setData(res.data);
        });
    };
    useEffect(() => {
        getData();
        return () => {
            isCancelled.current = true;
        };
    }, []);

    const [selectedBlog, setSelectedBlog] = useState({});

    const handleAddOrUpdate = (values) => {
        return axios.post("/videos/addOrUpdate", values).then((res) => {
        }).then(() => {
            setIsAddDialogOpen(false);
            getData();
        });
    };
    const handleDelete = (values) => {
        return axios.post("/videos/remove", values).then((res) => {
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
                        <AddOrEditVideo open={isAddDialogOpen} handleClose={() => setIsAddDialogOpen(false)}
                                        data={selectedBlog} onSubmit={handleAddOrUpdate}/>
                        <MaterialTable
                            title={"Videos"}
                            actions={[
                                {
                                    icon: 'add',
                                    tooltip: 'Add Row',
                                    isFreeAction: true,
                                    onClick: (event, rowData) => {
                                        setSelectedBlog({});
                                        setIsAddDialogOpen(true);
                                    }
                                },
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit Row',
                                    onClick: (event, rowData) => {
                                        console.log(rowData);
                                        setSelectedBlog(rowData);
                                        setIsAddDialogOpen(true);
                                    }
                                }
                            ]}

                            columns={columns.map((c) => ({...c, tableData: undefined}))}
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
