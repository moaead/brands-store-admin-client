import React, {useEffect, useState} from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from "material-table";
import axios from "axios";
import {useHistory} from "react-router-dom"
import FileView from "../../components/FileView/FileView";

export default function PendingPosts() {
    const router = useHistory();
    const [data, setData] = useState([]);
    const isCancelled = React.useRef(false);

    const [columns, setColumns] = useState([
        {
            title: 'Media', field: 'media', render: (data) => {
                return (
                        <FileView item={data.media} />
                );
            }
        },
        {title: 'Description', field: 'content'},
        {
            title: 'Create Date', field: 'createdDate', type: "datetime",
        },
    ]);

    useEffect(() => {
        axios.get("/ManageUsers/GetPendingPosts").then((res) => {
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
                            title={"Pending Users"}
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
                                ,
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit post',
                                    onClick: (event, rowData) => {
                                        router.push({ pathname: '/edit-posts', state: {post: rowData}})
                                    }
                                }

                            ]}
                            options={{
                                cellStyle: {
                                    width: 300,
                                    minWidth: 300,
                                    wordBreak: "break-word"
                                },
                                headerStyle: {
                                    width: 300,
                                    minWidth: 300,
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
