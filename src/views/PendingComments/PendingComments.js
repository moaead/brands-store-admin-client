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

export default function PendingComments() {
    const [data, setData] = useState([]);
    const isCancelled = React.useRef(false);

    const [columns, setColumns] = useState([
        {title: 'Description', field: 'description'},
        {
            title: 'Create Date', field: 'createdDate', type: "datetime",
        },
    ]);

    useEffect(() => {
        axios.get("/ManageUsers/GetPendingUsers").then((res) => {
            if(isCancelled.current) return;
            setData(res.data);
        });        return () => {
            isCancelled.current = true;
        };
    }, []);


    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <MaterialTable
                            title={"Pending Comments"}
                            columns={columns}
                            data={data}
                            actions={[
                                {
                                    icon: 'check',
                                    tooltip: 'Approve',
                                    onClick: (event, rowData) => {
                                        // Do save operation
                                    }
                                },
                                {
                                    icon: 'delete',
                                    tooltip: 'Delete',
                                    onClick: (event, rowData) => {}
                                }

                            ]}
                            options={{
                                cellStyle: {
                                    width: 200,
                                    minWidth: 200,
                                    wordBreak: "break-word"
                                },
                                headerStyle: {
                                    width: 200,
                                    minWidth: 200,
                                    wordBreak: "break-word"
                                },
                            }}
                        />

                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
