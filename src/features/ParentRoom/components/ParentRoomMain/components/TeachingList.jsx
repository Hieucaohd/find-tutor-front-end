import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import TutorItem from './TutorItem';

TeachingList.propTypes = {
    teachingList: PropTypes.array,
};

const useStyles = makeStyles({
    root: {
        padding: "0px 8px",
        margin: "8px 0",
        "& li": {
            "list-style-type": "none",
        }
    },
})

function TeachingList(props) {
    const {teachingList = []} = props;
    const classes = useStyles();
    return (
        <ul className={classes.root}>
            {teachingList.map( (teaching) => (
                 <li key = {teaching.id}>
                    <TutorItem
                        tutor = {teaching.tutor} 
                    />
                </li>
            ))}
        </ul>
    );
}

export default TeachingList;