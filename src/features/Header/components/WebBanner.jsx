import SlideShow from 'components/SlideShow';
import React from 'react';
import { Link } from 'react-router-dom';


function Banner(props) {
    return (
        <div className="navigation__banner">
            {/* <img src={require("../../../assets/image/banner1.webp").default} alt="banner" /> */}
            <SlideShow 
               imageList={[
                    require("assets/image/banner1.webp").default,
                    require("assets/image/banner2.webp").default,
                    require("assets/image/banner3.webp").default,
               ]}
            />
            <div className="navigation__banner__slogan">
                <h3>Bạn muốn kiếm <span>công việc gia sư</span> 
                <br/>
                hoặc <span>thuê gia sư</span> ?</h3>
                
                <h4>Đăng kí tài khoản ngay </h4>
                
                <Link to="/signup">
                    <button>
                        Đăng kí tài khoản
                    </button>
                </Link>
            </div>
            
        </div>
    );
}

export default Banner;