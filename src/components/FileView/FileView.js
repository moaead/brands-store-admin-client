import React from "react";
import ReactPlayer from "react-player";
import styles from "assets/jss/material-dashboard-react/components/fileViewStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(styles);
const FileView = ({item, className, videoClassName}) => {
    const styles = useStyles();
    switch (item.type) {
        case "video" :
            return <div className={styles.playerWrapper}>
                <ReactPlayer url={item.url} light width="100%" height="100%" className={styles.reactPlayer} controls/>
            </div>;
        case "image" :
            return <div className={styles.imageWrapper}><img src={item.url} className={styles.image}/></div>
        default :
            return <a href={item.url} target="_blank" download="attachment">
                <div className={styles.imageWrapper}><img src="/download.png" className={styles.image}/></div>
            </a>
    }

};

export default FileView;