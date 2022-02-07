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
import {AddOrEditMojawaratDialog} from "./AddOrEditMojawaratDialog";
import axios from "axios";

export default function Mojawarat() {
    const isCancelled = React.useRef(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [columns, setColumns] = useState([
        {title: 'Title', field: 'title'},
        {
            title: 'Image', field: 'image', render: (data) => {
                return (
                    <img style={{
                        width: 60,
                        height: 60
                    }} src={data.image} alt="preview" />
                );
            }
        },
    ]);

    const [data, setData] = useState([]);

    const getData = () => {
        return axios.get("/mojawarat/get").then((res) => {
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

    const [selectedMojawara, setSelectedMojawara] = useState({});

    const handleAddOrUpdate = (values) => {
        return axios.post("/mojawarat/addOrUpdate", values).then((res) => {
        }).then(() => {
            setIsAddDialogOpen(false);
            getData();
        });
    };
    const handleDelete = (values) => {
        return axios.post("/mojawarat/remove", values).then((res) => {
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
                        <AddOrEditMojawaratDialog open={isAddDialogOpen} handleClose={() => setIsAddDialogOpen(false)}
                                                  data={selectedMojawara} onSubmit={handleAddOrUpdate}/>
                        <MaterialTable
                            title={"Mojawarat"}
                            actions={[
                                {
                                    icon: 'add',
                                    tooltip: 'Add Row',
                                    isFreeAction: true,
                                    onClick: (event, rowData) => {
                                        setSelectedMojawara({});
                                        setIsAddDialogOpen(true);
                                    }
                                },
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit Row',
                                    onClick: (event, rowData) => {
                                        setSelectedMojawara(rowData);
                                        setIsAddDialogOpen(true);
                                    }
                                }
                            ]}

                            columns={columns}
                            data={data}
                            editable={{
onRowDelete: handleDelete}}
                        />

                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
