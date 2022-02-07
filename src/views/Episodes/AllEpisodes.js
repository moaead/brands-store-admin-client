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

export default function AllEpisodes() {
    const [data, setData] = useState([]);
    const isCancelled = React.useRef(false);
    const router = useHistory();

    const [columns, setColumns] = useState([
        {title: 'Name', field: 'name'},
        {title: 'English Name', field: 'englishName'},
        {title: 'Sub Title', field: 'subTitle'},
        {title: 'English Sub Title', field: 'englishSubTitle'},
        {title: 'Description', field: 'description', render: (data) => {
                return (
                    <p style={{maxHeight: 100,     overflow: "auto"}}> {data.description}</p>
                );
            }
        },

        {title: 'English Description', field: 'englishDescription', render: (data) => {
                return (
                    <p style={{maxHeight: 100, overflow: "auto"}}> {data.englishDescription}</p>
                );
            }
        },
        {title: 'Created Date', field: 'createdDate', type: "date"},
        {title: 'Is Active', field: 'isActive', type: "boolean"},

    ]);

    useEffect(() => {
        axios.get("/Episodes/GetAllEpisodesDetails").then((res) => {
            if(isCancelled.current) return;
            setData(res.data);
        });        return () => {
            isCancelled.current = true;
        };
    }, []);
    const createPost =()=>{
        router.push(router.push({ pathname: '/create-edit-episode', state: {episode: undefined}}))
    };

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <Button color="primary" variant="contained" style={{marginBottom: 10}}
                                onClick={createPost}>
                            Create episode</Button>
                        <MaterialTable
                            title={"Episode"}
                            columns={columns}
                            data={data}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit episode',
                                    onClick: (event, rowData) => {
                                        router.push({ pathname: '/create-edit-episode', state: {episode: rowData}})
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
