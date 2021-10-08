import { fetchGraphQl } from "./graphQl"

export const GetTutorProfile = async (id, token) => {
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
                number_phone
            }
  	    }    
    }`
    const tutorprofile = await fetchGraphQl("tutor profile", "user_by_id", query, token);
    return { 
        ...tutorprofile?.tutormodel,
        username: tutorprofile?.username,
        imageprivateusermodel: tutorprofile?.imageprivateusermodel,
    };
}

export const GetParentProfile = async (id, token) => {
    const query = `
    {
		user_by_id(id: ${id}) {
            username
            imageprivateusermodel {
                avatar
            }
    	    parentmodel {
                number_phone
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
    const parentprofile = await fetchGraphQl("parent profile", "user_by_id", query, token);
    return {
        ...parentprofile?.parentmodel,
        username: parentprofile?.username,
        imageprivateusermodel: parentprofile?.imageprivateusermodel,
    };
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

export const getTutorInfoForRoom = (id) => {
    const query = `
    {
        user_by_id (id: ${id}) {
            username
            imageprivateusermodel {
                avatar
            }
            tutormodel {
                first_name
                last_name
            }
        }
    }`;
    return fetchGraphQl("tutor info for room", "user_by_id", query);
}