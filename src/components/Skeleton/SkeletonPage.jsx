import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

SkeletonPage.propTypes = {
    number: PropTypes.number.isRequired,
};

function SkeletonPage(number) {
    let numberArr = [];
    for(let i = 0; i<12; i++){
        numberArr.push(i);
    };
    return (
        <Grid container spacing={2}>
            {numberArr.map( () => (
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Box p={3} display="flex" justifyContent="center" alignItems="center">
                        <Skeleton variant="rect" width={250} height={250*1.35} />
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default SkeletonPage;