import { makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

ProfileSkeleton.propTypes = {
    
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    skeletonTop: {
        width: '820px',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            height: '180px',
        },
        [theme.breakpoints.up('sm')]: {
            width: '820px',
            height: '240px',
        },
        marginTop: '24px',
        marginBottom: '12px',
        borderRadius: '12px',
    },
    skeleton: {
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            height: '300px',
        },
        [theme.breakpoints.up('sm')]: {
            width: '820px',
            height: '400px',
        },
        marginBottom: '12px',
        borderRadius: '12px',
    }
}));

function ProfileSkeleton(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Skeleton variant="rect" className={classes.skeletonTop} />
            <Skeleton variant="rect" className={classes.skeleton} />
        </div>
    );
}

export default ProfileSkeleton;