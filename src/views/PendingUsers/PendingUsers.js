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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PendingNewUsers from "./PendingNewUsers";
import PendingEditUsers from "./PendingEditUsers";

export default function PendingUsers() {
    const [data, setData] = useState([]);
    const [tab, setTab] = useState(0);
    const isCancelled = React.useRef(false);
    const handleChange=(e, value)=>{
        setTab(value);
    };


    return (
        <GridContainer>
            <Tabs value={tab} onChange={handleChange}>
                <Tab label="New users" />
                <Tab label="Edit user" />
            </Tabs>
                {tab === 0 ?
                <PendingNewUsers />
                :
                    <PendingEditUsers />
                }
        </GridContainer>
    );
}
