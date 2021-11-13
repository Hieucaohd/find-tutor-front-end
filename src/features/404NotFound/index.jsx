import React from 'react';
import { Link } from 'react-router-dom';
import "./styles.scss";

function NotFound(props) {
    return (
		<div id="notfound">
		    <div class="notfound">
		    	<div class="notfound-404">
		    		<h1>404</h1>
		    	</div>
		    	<h2>Oops! Trang này không tồn tại</h2>
		    	<p>Trang này không tồn tại, bấm bên dưới để trở về trang chủ</p>
		    	<Link to="/">Trang chủ</Link>
		    </div>
	    </div>
    );
}

export default NotFound;