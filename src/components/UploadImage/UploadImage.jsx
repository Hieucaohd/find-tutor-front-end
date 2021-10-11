import { Avatar } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FcAddImage } from 'react-icons/fc';
import "./styles.scss";

function UploadImage({typeCurrentAvatar = false, onSubmit = null, onClose = null}) {
    
    const [showImage, setShowImage] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const imageRef = useRef(null);
    
    function readURL(e) {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                setCurrentImage(e.target.result)
            };
            reader.readAsDataURL(e.target.files[0]);
            // setImage();
            
            setShowImage(true);
        }
    }

    const handleSubmit = async () => {
        if(!onSubmit) return;
        onSubmit(imageRef.current.files[0]);
    }

    const handleClose = () => {
        if(!onClose) return;
        onClose();
    }

    const handleOnClick = () => {
        if(!imageRef) return;
        imageRef.current.click();
    }

    return (
    <div className="uploadimage">
        <div className="uploadimage__overlay" onClick={handleClose}></div>
        <div className="uploadimage__content">
        <AiFillCloseCircle className="uploadimage__close" onClick={handleClose} />
         <div className="uploadimage__drop" onClick={handleOnClick}>
            <input type="file" multiple={false} hidden onChange={e => readURL(e)} ref={imageRef}/>
                {/* <p>Thả file ở đây ...</p> :
                <div className="uploadimage__title">
                    <FcAddImage />
                    <p>Thả file vào đây hoặc bấm vào đây</p>
                </div> */}
            <FcAddImage />
            <span>Tải ảnh lên</span>
        </div> 
        {showImage && <Avatar className="uploadimage__preview" alt="yourimage" src={currentImage} />}
        {showImage && <button onClick={handleSubmit} className="uploadimage__submit">Thay ảnh đại diện</button>}
        </div>
    </div>
  )
}

export default UploadImage;