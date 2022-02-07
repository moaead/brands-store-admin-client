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

export default function AllFAQ() {
    const [data, setData] = useState([]);
    const isCancelled = React.useRef(false);
    const router = useHistory();

    const [columns, setColumns] = useState([
        {title: 'Question', field: 'question'},
        {title: 'English question', field: 'englishQuestion'},
        {title: 'Answer', field: 'answer'},
        {title: 'English answer', field: 'englishAnswer'},
        {title: 'Created Date', field: 'createdDate', type: "date"},
    ]);

    useEffect(() => {
        axios.get("/Faqs/GetAllFaqs").then((res) => {
            if(isCancelled.current) return;
            setData(res.data);
        });        return () => {
            isCancelled.current = true;
        };
    }, []);
    const createPost =()=>{
        router.push(router.push({ pathname: '/create-edit-faq', state: {faq: undefined}}))
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
                                        router.push({ pathname: '/create-edit-faq', state: {faq: rowData}})
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
