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
import {AddOrEditCategoryDialog} from "./AddOrEditCategoryDialog";
import axios from "axios";

export default function Categories() {
    const isCancelled = React.useRef(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [columns, setColumns] = useState([
        {title: 'name', field: 'name'},
        {title: 'Arabic Name', field: 'arabicName'}
    ]);
    const [data, setData] = useState([]);

    const getData = () => {
        return axios.get("/Categories/Get").then((res) => {
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

    const [selectedCategory, setSelectedCategory] = useState({});

    const handleAddOrUpdate = (values) => {
        return axios.post("/Categories/AddOrUpdate", values).then((res) => {
        }).then(() => {
            setIsAddDialogOpen(false);
            getData();
        });
    };
    const handleDelete = (values) => {
        return axios.post("/Categories/Remove", values).then((res) => {
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
                        <AddOrEditCategoryDialog open={isAddDialogOpen} handleClose={() => setIsAddDialogOpen(false)}
                                                 data={selectedCategory} onSubmit={handleAddOrUpdate}/>
                        <MaterialTable
                            title={"Categories"}
                            actions={[
                                {
                                    icon: 'add',
                                    tooltip: 'Add Row',
                                    isFreeAction: true,
                                    onClick: (event, rowData) => {
                                        setSelectedCategory({});
                                        setIsAddDialogOpen(true);
                                    }
                                },
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit Row',
                                    onClick: (event, rowData) => {
                                        setSelectedCategory(rowData);
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
