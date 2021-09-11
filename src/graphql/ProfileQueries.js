import { fetchGraphQl } from "./graphQl"

export const GetTutorProfile = async (id) => {
    const query = `{
        user_by_id(id: ${id}) {
            username
            imageprivateusermodel {
                avatar
            }
        	tutormodel {
                first_name
                last_name
                birthday
                province_code
                district_code
                ward_code
                profession
                khu_vuc_day
                experience
                university
                achievement
                lop_day
            }
  	    }    
    }`
    const tutorprofile = await fetchGraphQl("tutor profile", "user_by_id", query);
    return { 
        ...tutorprofile?.tutormodel,
        username: tutorprofile?.username,
        imageprivateusermodel: tutorprofile?.imageprivateusermodel,
    };
}

export const GetParentProfile = async (id) => {
    const query = `
    {
		user_by_id(id: ${id}) {
            username
            imageprivateusermodel {
                avatar
            }
    	    parentmodel {
                number_phone
                number_of_identity_card
                first_name
                last_name
                birthday
                province_code
                district_code
                ward_code
            }
  	    }
    }
    `
    const parentprofile = await fetchGraphQl("parent profile", "user_by_id", query);
    return parentprofile?.parentmodel;
}

export const getUserNameAndAvatar = (id) => {
    const query = `
    {
        user_by_id (id: ${id}) {
            username
            imageprivateusermodel {
                avatar
            }
        }
    }`;
    return fetchGraphQl("user info", "user_by_id", query);
}