import { fetchGraphQl } from "./graphQl"

export const GetAllRoom = (pages) => {
    const query = `{
        all_room(page: ${pages}, num_in_page: 12){
            result {
              id
              province_code
              district_code
              ward_code
              lop
              subject
              pricemodel_set {
                money_per_day
                time_in_one_day
              }
            }
            num_pages
        }
    }`
    return  fetchGraphQl("room list", "all_room", query);
}
export const GetFilterRoom = ({filterRoom, pages}) => {
    const {lop, province_code, district_code, ward_code, subject } = filterRoom;
    const queryString = `${lop ? `lop: [${lop}],` : ``}, 
        ${province_code ? `province_code: ${province_code},` : ``},
        ${district_code ? `district_code: ${district_code}` : ``}
        ${ward_code ? `ward_code: ${ward_code},` : ``}
        ${subject ? `search_infor: "${subject}",` : ``}
        page: ${pages}, num_in_page: 12
        `;
    const query = `{
        search_room (${queryString}) {
            result {
                id
                province_code
                district_code
                ward_code
                lop
                subject
            }
            num_pages
        }
    }`
    return fetchGraphQl("filter room list", "search_room", query);
}

export const GetUserParentRoom = async (id) => {
    const query = `
    {
        user_by_id(id: ${id}){
            parentmodel {
                parentroommodel_set {
                    id
                    subject
                    province_code
                    ward_code
                    district_code
                    lop
                }
            }     
        }
    }
    `;
    const parentModel = await fetchGraphQl("parent room", "user_by_id", query);
    return parentModel.parentmodel.parentroommodel_set;
}

export const GetParentRoomDetail = async(id) => {
    const query = `
    {
        room_by_id(id: ${id}) {
            parent {
                user {
                    id
                    username
                    imageprivateusermodel {
                        avatar
                    }
                }
                first_name
                last_name
            }
            province_code
            district_code
            ward_code
            detail_location
            subject
            lop
            day_can_teach
            other_require
            pricemodel_set {
                money_per_day
                time_in_one_day
                type_teacher
                sex_of_teacher
            }
            waitingtutormodel_set {
                id
                tutor {
                    user {
                        id
                        imageprivateusermodel {
                            avatar
                        }
                        username
                    }
                    first_name
                    last_name
                }
            }
            listinvitedmodel_set {
                id
                tutor {
                    user {
                        id
                        username
                        imageprivateusermodel {
                            avatar
                        }
                    }
                    first_name
                    last_name
                }
            }
            tryteachingmodel {
                id
                tutor {
                    user {
                        id
                        imageprivateusermodel {
                            avatar
                        }
                        username
                    }
                    first_name
                    last_name
                }
            }
            tutorteachingmodel {
                id
                tutor {
                    user {
                        id
                        imageprivateusermodel {
                            avatar
                        }
                        username
                    }
                    first_name
                    last_name
                }
            }
        }
    }`;
    const roomModel = await fetchGraphQl("parent room detail", "room_by_id", query);
    return roomModel;
}

export const GetAllParentRoom = async(id) => {
    const query = `
    {
        user_by_id(id: ${id}){
            parentmodel {
                parentroommodel_set {
                    id
                    subject
                    lop
                    province_code
                    district_code
                    pricemodel_set {
                        money_per_day
                    }
                }
            }
        }
    }`;
    const allroomModel = await fetchGraphQl("all user's parent room", "user_by_id", query);
    const userParentRoom = await allroomModel?.parentmodel.parentroommodel_set;
    return userParentRoom;
}