import { server_name } from "..//..//namespace";

export const registerAccount = async ( args ) => {
      return await fetch(
          `${server_name}/auth/register/`,
        {
          method: "POST",
          header: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args)
        }
      ).then((response) => {
        if (response.ok){
            return response.JSON();
        } else {
          alert("không đăng kí tài khoản thành công");
        }
    });
}

export const registerInfo = async ( args ) => {
    return await fetch(
        "http://localhost:8000/findTutor/tutorList/",
        {
          method: "POST",
          header: args.token,
          body: {
            profession: args.profession,
            experience: args.experience,
            achievement: args.achievement,  
            cap_day: null,
            lop_day: null,
            number_phone: args.telephone,
            number_of_identity_card: args.identitycard,
            first_name: null,
            last_name: args.name,
            birthday: args.birthday,
            location: null,
          }
        }
      ).then((response) => {
        if (response.ok) {
            return response;
        } else {
          alert("không đăng kí tài khoản thành công");
        }
      });
}