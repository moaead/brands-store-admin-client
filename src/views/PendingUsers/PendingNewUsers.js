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

export default function PendingNewUsers() {
    const isCancelled = React.useRef(false);
    const [data, setData] = React.useState([]);
    const [columns, setColumns] = useState([
        {title: 'First Name', field: 'firstName'},
        {title: 'Last Name', field: 'lastName'},
        {title: 'Email', field: 'email'},
        {title: 'Bio', field: 'bio'},
        {title: 'Gender', field: 'gender'},
        {title: 'Id Number', field: 'idNumber'},
        {title: 'Register Type', field: 'registerType'},
        {title: 'grade/ job Title/ Guardian role', field: 'title'},
        {title: 'School', field: 'school'},
        {title: 'Country', field: 'country'},
        {title: 'Governorate', field: 'governorate'},
        {title: 'Directorate', field: 'directorate'},
        {
            title: 'Profile picture', field: 'profilePicture', render: (data) => {
                return (
                        <img src={data.profilePicture} style={{width: 100, height: 100}} />
                );
            }
        },
        {
            title: 'Birth Date', field: 'birthDate', type: "datetime",
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
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardBody>
                    <MaterialTable
                        title={"Pending new Users"}
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
                                onClick: (event, rowData) =>{}
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
    );
}
