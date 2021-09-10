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

