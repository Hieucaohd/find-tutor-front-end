import { Avatar, makeStyles } from '@material-ui/core';
import Modal from 'components/Modal/Modal';
import TutorProfile from 'features/Profile/components/TutorProfile/TutorProfile';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import NumberPhone from './NumberPhone';

function TutorItem( {tutorInfo = {}, isOwner = false, onAdd = null, userId = 0, isTeaching = false, onDelete=null} ) {
    const classes = useStyles();
    // const history = useHistory();
    const {id, tutor} = tutorInfo;
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showNumberPhone, setShowNumberPhone] = useState(false);
    const [onShowProfile, setOnShowProfile] = useState(false);
    const handleDelete = () => {
        if(!onDelete) return;
        onDelete(id);
        setShowDeleteModal(false);
    }
    const handleShowTutorInfo = () => {
        // history.push(`/profile/tutor/${tutor.user.id}`)
        setOnShowProfile(true);
        // document.body.style["overflow-y"] = "hidden";
    }

    const handleDontShowTutorInfo = () => {
        setOnShowProfile(false);
        // document.body.style["overflow-y"] = "auto";
    }

    const handleCheck = () => {
        if(!onAdd) return;
        onAdd(id);
        setShowCheckModal(false);
    }


    const handleShowText = () => {
        if(isOwner) return "Xóa gia sư này khỏi danh sách ?";
        else if(isThisTutor) return "Hủy ứng tuyển/dạy học ?"
    }

    //kiểm tra user có phải gia sư này không
    const isThisTutor = Number(userId) === Number(tutor?.user.id);

    return (
        <div className={classes.root}>
            <div className={classes.info}>
                <div className={classes.user}>
                    <Avatar className={classes.avatar} src={tutor?.user.imageprivateusermodel?.avatar || require("../../../../../assets/image/user.webp").default } />
                    <button className={classes.detail} onClick={handleShowTutorInfo}>Chi tiết</button>
                </div>
                
                <div>
                    <h4>{tutor?.first_name} {tutor?.last_name} <span></span></h4>
                    <h5>{tutor?.profession === "gv" && "Giáo Viên"}</h5>
                    <h5>{tutor?.profession === "sv" && "Sinh Viên"}</h5>
                    <h5><span>Sinh năm</span> {tutor?.birthday.slice(0,4)}</h5>
                    <h5><span>Đã dạy</span> {tutor?.number_teaching} lớp</h5>
                    {/* <h5> {tutor?.university}</h5> */}
                </div>
            </div>
            <div className={classes.button}>
                { (isOwner && !isTeaching) && <button className={classes.agree} onClick={() => setShowCheckModal(true)}>Đồng ý</button>}
                { (isOwner || isThisTutor) && <button className={classes.delete} onClick={() => setShowDeleteModal(true)}>Xóa</button>}
                {isOwner && <button className={classes.call} onClick={() => setShowNumberPhone(true)}>Liên hệ</button>}
            </div>
            {showNumberPhone && <NumberPhone numberPhone={tutor?.number_phone} onClose={() => setShowNumberPhone(false)}/>}
            {showCheckModal && <Modal typeIcon="check" text="Đồng ý gia sư này dạy học ?" onAgree={handleCheck} onDisagree={() => setShowCheckModal(false)}/>}
            {showDeleteModal && <Modal typeIcon="delete" text={handleShowText()} onAgree={handleDelete} onDisagree={() => setShowDeleteModal(false)}/>}
            {onShowProfile && <div> 
                 <div className={classes.profile}>
                     <AiOutlineClose className={classes.close} onClick={handleDontShowTutorInfo}/>
                      
                    <TutorProfile currentId={tutor?.user.id}/>
                </div>
                <div className={classes.overlay} onClick={handleDontShowTutorInfo}></div>
            </div>}
        </div>
    )

}


const useStyles = makeStyles(theme => ({
    root: {
        "display": "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "12px 0px",
        borderRadius: 8,
        marginBottom: 16,
        boxShadow: '0 1px 4px 0 #ccc',
        backgroundColor: 'white',
        
        "& h4": {
            margin: 0,
        },
        "& h5": {
            margin: 0,
            "& span": {
                color: "#777777",
            }
        }
    },
    user: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginRight: 16,
    },
    detail: {
        border: 'none',
        fontWeight: 600,
        padding: '4px 8px',
        backgroundColor: '#d7d5d5',
        borderRadius: 4,
        opacity: 0.8,
        "&:hover": {
            opacity: 1,
            cursor: "pointer"
        }
    },
    info: {
        display: "flex",
        alignItems: "center",
        marginLeft: 16,
        "& h5": {
            fontWeight: 400,
        }
    },
    avatar: {
        width: 72,
        height: 72,
        marginBottom: 4,
    },
    button: {
        marginRight: 16,
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection: 'column',
        },
        [theme.breakpoints.up('sm')]: {
        },
        "& button": {
            border: 'none',
            color: 'white',
            fontWeight: 600,
            borderRadius: 4,
            marginRight: 8,
            opacity: 0.8,
            "&:hover": {
                opacity: 1,
                cursor: "pointer",
            },
            [theme.breakpoints.down('xs')]: {
                width: 80,
                padding: '4px 8px',
                marginBottom: 4,
            },
            [theme.breakpoints.up('sm')]: {
                padding: '8px 16px',
            },
        }
    },
    agree: {
        
        backgroundColor: '#0061FF',
    },
    delete: {
        backgroundColor: "#EB220B",
    },
    call: {
        backgroundColor: '#2fbc5e',
    },
    profile: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        backgroundColor: '#F4F6FB',
        zIndex: 3,
        borderRadius: 8,
        [theme.breakpoints.down('xs')]: {
            "&::-webkit-scrollbar" : { 
                display: 'none',
            },
            width: "96vw",
            maxHeight: "60vh",

        },
        [theme.breakpoints.up('sm')]: {
            width: 720,
            maxHeight: "80vh",
            marginTop: 12,
        },
    },
    overlay: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,  
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 2,  
    },
    close: {
        // position: "-webkit-sticky",
        position: 'sticky',
        padding: 8,
        backgroundColor: "#dbdada",
        borderRadius: "50%",
        zIndex: 10,
        "&:hover": {
            cursor: 'pointer',
            backgroundColor: "#ccc",
        },
        [theme.breakpoints.down('xs')]: {
            top: 4,
            left: 4,
        },
        [theme.breakpoints.up('sm')]: {
            top: 10,
            left: 10,
        },
    },
    // profileBar: {
    //     position: 'sticky',
    //     backgroundColor: "#dbdada",
    //     top: 0,
    //     right: 0,
    //     left: 0,
    //     height: 40,
    //     zIndex: 5,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    // }
}));

export default TutorItem;