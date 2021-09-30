import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

SkeletonPage.propTypes = {
    number: PropTypes.number,
};

const useStyles = makeStyles({
    root: {},
    skeleton: {
        borderRadius: '8px',
    },
})

function SkeletonPage( {number = 12}) {
    const classes= useStyles();
    let numberArr = [];
    for(let i = 0; i<number; i++){
        numberArr.push(i);
    };
    return (
        <Grid container spacing={2}>
            {numberArr.map( () => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box mb={4} display="flex" justifyContent="center" alignItems="center" >
                        <Skeleton variant="rect" width={280} height={280} className={classes.skeleton}/>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default SkeletonPage;