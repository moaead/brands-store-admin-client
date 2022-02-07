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
import {useHistory} from "react-router-dom"
import Button from "@material-ui/core/Button";

export default function AllNews() {
    const [data, setData] = useState([]);
    const isCancelled = React.useRef(false);
    const router = useHistory();

    const [columns, setColumns] = useState([
        {title: 'Subject', field: 'subject'},
        {title: 'English subject', field: 'englishSubject'},
        {
            title: 'Content', field: 'content', render: (data) => {
                return (
                    <p style={{maxHeight: 100, overflow: "auto"}}> {data.content}</p>
                )
            },
        },
        {title: 'English content', field: 'englishContent',
            render: (data) => {
                return (
                    <p style={{maxHeight: 100, overflow: "auto"}}> {data.englishContent}</p>
                )
            }},
        {title: 'Created Date', field: 'createdDate', type: "date"},
    ]);

    useEffect(() => {
        axios.get("/News/GetAllNews").then((res) => {
            if(isCancelled.current) return;
            setData(res.data);
        });        return () => {
            isCancelled.current = true;
        };
    }, []);
    const createPost =() => {
        router.push(router.push({ pathname: '/create-edit-news', state: {news: undefined}}))
    };

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <Button color="primary" variant="contained" style={{marginBottom: 10}}
                                onClick={createPost}>
                            Create FAQ</Button>
                        <MaterialTable
                            title={"Episode"}
                            columns={columns}
                            data={data}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit episode',
                                    onClick: (event, rowData) => {
                                        router.push({ pathname: '/create-edit-news', state: {news: rowData}})
                                    }
                                }
                            ]}
                            options={{
                                cellStyle: {
                                    width: 200,
                                    minWidth: 200,
                                    wordBreak: "break-word",
                                },
                                headerStyle: {
                                    width: 200,
                                    minWidth: 200,
                                    wordBreak: "break-word"
                                }
                            }}
                        />

                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
