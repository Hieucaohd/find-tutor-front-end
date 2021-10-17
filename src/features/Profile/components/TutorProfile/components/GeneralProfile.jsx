import { Avatar, makeStyles } from '@material-ui/core';
import UploadImage from 'components/UploadImage/UploadImage';
import { selectToken } from 'features/auth/authSlice';
import { formatBirthDay, updateAvatar } from 'features/Profile/profile';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { AiFillCamera, AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiTwotoneEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormData from 'form-data';
import Modal from "components/Modal/Modal";
import Loading from "components/Loading/Loading";

GeneralProfile.propTypes = {
    TutorInfo: PropTypes.object,
};

const getJobName = (str) => {
    if(!str) return '';
    if(str === 'sv') return 'Sinh Viên';
    else if(str === 'gv') return 'Giáo Viên';
    else return 'Khác';
}

function GeneralProfile({tutorInfo, isUser = false, type}) {
    const classes = useStyles();
    const [showChangeAvatar, setShowChangeAvatar] = useState(false);
    const token = useSelector(selectToken);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const handleChangeAvatar = async (image) => {
        setShowLoading(true);
        const file = new FormData();
        file.append('avatar', image);
        const response = await updateAvatar({
            typeCurrent: tutorInfo.imageprivateusermodel?.avatar ? true : false,
            token: token,
            file: file})
    
        if(response) {
            setShowLoading(false);
            setShowSuccessModal(true);
        } else {
            setShowFailedModal(true);
            setShowLoading(false);
        }
    }

    return (
        <div className={classes.wallpaper}>
            {isUser && <Link to={`/settings/profile/${type}`}><AiTwotoneEdit  className={classes.fix}/> </Link>}
            <div className={classes.avatarContainer}>
            {isUser && <button className={classes.camera} onClick={() => setShowChangeAvatar(true)}><AiFillCamera /></button>}
                <Avatar alt="Travis Howard" variant="square" 
                    className={classes.avatar} 
                    src={tutorInfo.imageprivateusermodel?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_3I4Y2ydmFBosgWcdoqVBBCsYZksWAhHtjg&usqp=CAU"} />
            </div>
            <div className={classes.info}>
                <div className={classes.name}>
                    <h3 className={classes.name}>{tutorInfo.first_name?.toUpperCase()} {tutorInfo.last_name?.toUpperCase()}</h3>
                    <h5>{getJobName(tutorInfo.profession)}</h5>
                </div>
                <div className={classes.generalInfo}>
                    <div className={classes.birth}>
                        <h4>{formatBirthDay(tutorInfo.birthday)}</h4>
                        <span>NGÀY SINH</span>
                    </div>
                    <div className={classes.address}>
                        <h4>{tutorInfo.address}</h4>
                        <span>ĐỊA CHỈ</span>
                    </div>
                </div>
                <div className={classes.social}>
                    {tutorInfo?.linkmodel_set?.find(item => item?.name === 'facebook')?.url && <a href={tutorInfo?.linkmodel_set?.find(item => item?.name === 'facebook')?.url}><AiOutlineFacebook/></a>}
                    {tutorInfo?.linkmodel_set?.find(item => item?.name === 'instagram')?.url && <a href={tutorInfo?.linkmodel_set?.find(item => item?.name === 'instagram')?.url}><AiOutlineInstagram/></a>}
                    {tutorInfo?.linkmodel_set?.find(item => item?.name === 'linkedln')?.url && <a href={tutorInfo?.linkmodel_set?.find(item => item?.name === 'linkedln')?.url}><AiOutlineLinkedin /></a>}
                </div>
            </div>
            {showChangeAvatar && <UploadImage onClose={() => setShowChangeAvatar(false)} onSubmit={handleChangeAvatar}/>}
            {showFailedModal && <Modal typeIcon="fail" text="Thay Avatar không thành công" onAgree={() => setShowFailedModal(false)} />}
            {showSuccessModal && <Modal typeIcon="check" text="Thay Avatar thành công" onAgree={() => window.location.reload()} />}
            {showLoading && <Loading />}
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    wallpaper: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#E9E8EB',
        border: '0.5px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        position: 'relative',
        "& h5": {
            margin: 0,
        },
        "& h4": {
            margin: 0,
        },
        "& h3": {
            margin: 0,
        },
        "& p": {
            margin: 0,
        },
        [theme.breakpoints.down('xs')]: {
            padding: '12px 8px',
        },
        [theme.breakpoints.up('sm')]: {
            padding: '24px 16px',
        },
    },
    fix: {
        color: 'white',
        borderRadius: '50%',
        position: 'absolute',
        zindex: 2,
        backgroundColor: '#7f98fa',
        top: 8,
        right: 8,
        padding: 8,
        "&:hover" : {
            cursor: 'pointer',
            backgroundColor: '#5472EA',
        }
    },
    name: {
        "& h3": {
            fontWeight: 600,
            [theme.breakpoints.down('xs')]: {
                fontSize: '20px',
                margin: 0,
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: '28px',
            },
        },
        "& h5": {
            color: '#3b6997',
        }
    },
    avatarContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            marginRight: '12px',
        },
        [theme.breakpoints.up('sm')]: {
            marginRight: '56px',
        },
    },
    camera: {
        position: 'absolute',
        zIndex: 2,
        bottom: -8,
        right: -8,
        backgroundColor: '#ee6464',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        fontSize: 16,
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "&:hover": {
            backgroundColor: "#ff0000",
            cursor: "pointer",
        }
    },
    avatar: {
        [theme.breakpoints.down('xs')]: {
            width: '102px',
            height: '172px',
        },
        [theme.breakpoints.up('sm')]: {
            width: '160px',
            height: '200px',
        },
    },
    info: {
        flex: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        "& p": {
            color: '#5f5d5d',
            fontStyle: 'italic',
        },
    },
    generalInfo: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse'
        },
    },
    birth: {
        "& h4":{
            [theme.breakpoints.down('xs')]: {
                fontSize:  '14px',
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: '16px',
            },
        },
        [theme.breakpoints.down('xs')]: {
            marginRight: '16px',
        },
        [theme.breakpoints.up('sm')]: {
            marginRight: '40px',
        },
        "& span":{
            color: '#3b6997',
            fontSize: '12px',
            fontWeight: '400',
        }
    },
    address: {
        "& h4":{
            [theme.breakpoints.down('xs')]: {
                fontSize:  '14px',
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: '16px',
            },
        },
        "& span":{
            color: '#3b6997',
            fontSize: '12px',
            fontWeight: '400',
        }
    },
    social: {
        "& a": {
            opacity: '0.6',
            color: 'black',
            [theme.breakpoints.down('xs')]: {
                fontSize: '24px',
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: '32px',
            },
            "&:hover":{
                color: '#3b6997',
                opacity: 1,
            },
            marginRight: '8px',
        }
    }
}))

export default GeneralProfile;