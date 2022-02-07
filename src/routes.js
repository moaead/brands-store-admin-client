/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import DashboardPage from "views/Dashboard/Dashboard.js";
import PendingUsers from "./views/PendingUsers/PendingUsers";
import TocIcon from '@material-ui/icons/Toc';
import PendingPosts from "./views/PendingPosts/PendingPosts";
import PendingComments from "./views/PendingComments/PendingComments";
import CreateOrEditEpisodes from "./views/Episodes/CreateOrEditEpisodes";
import AllEpisodes from "./views/Episodes/AllEpisodes";
import AllFAQ from "./views/FAQ/AllFAQ";
import CreateOrEditFAQ from "./views/FAQ/CreateOrEditFAQ";
import AllNews from "./views/News/AllNews";
import CreateOrEditNews from "./views/News/CreateOrEditNews";
import EditPosts from "./views/PendingPosts/EditPosts";
import Products from "./views/Products/Products";
import Categories from "./views/Categories/Categories";

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        component: DashboardPage,
        layout: ""
    },
    {
        path: "/categories",
        name: "Categories",
        icon: TocIcon,
        component: Categories,
        layout: ""
    },
    {
        path: "/products",
        name: "Products",
        icon: TocIcon,
        component: Products,
        layout: ""
    },
];

export default dashboardRoutes;
