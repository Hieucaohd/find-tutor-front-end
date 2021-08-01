import { server_name, token_prefix } from "../../namespace";
import { setTutor } from "../auth/authSlice";


export const registerAccount = async ( args ) => {
      return await fetch(`${server_name}/auth/register/`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args)
        }
      ).then((response) => {
        if (response.ok){
            alert('dang ki tai khoan thanh cong');
            
            return response.json();
        } else {
          alert("không đăng kí tài khoản thành công");
          return response.json();
        }
    });
}

export const registerInfo = async( {token, tutorInfo, dispatch} ) => {
    return await fetch(`${server_name}/findTutor/tutorList/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${token}`,
          },
          body: JSON.stringify(tutorInfo)
        }
      ).then((response) => {
        if (response.ok) {
            alert('dang ki thong tin thanh cong');
            
            dispatch(setTutor());
            return true;
        } else {
          alert("không đăng kí tài khoản thành công");
          return false;
        }
      });
}

