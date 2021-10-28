import { makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    skeletonTop: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '180px',
        },
        [theme.breakpoints.up('md')]: {
            width: '820px',
            height: '240px',
        },
        marginTop: '24px',
        marginBottom: '12px',
        borderRadius: '12px',
    },
    skeleton: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '300px',
        },
        [theme.breakpoints.up('md')]: {
            width: '820px',
            height: '320px',
        },
        marginBottom: '12px',
        borderRadius: '12px',
    },

}));

function ProfileSkeleton({isParentRoom}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Skeleton variant="rect" className={classes.skeletonTop} style={{width: isParentRoom && "95%"}} />
            <Skeleton variant="rect" className={classes.skeleton} style={{width: isParentRoom && "95%"}}/>
        </div>
    );
}

export default ProfileSkeleton;