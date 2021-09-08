import { fetchGraphQl } from "./graphQl"

export const GetAllRoom = () => {
    const query = `{
        all_room {
          id
          province_code
          district_code
          ward_code
          lop
          subject
        }
    }`
    return  fetchGraphQl("room list", "all_room", query);
}
export const GetFilterRoom = ({lop, province_code, district_code, ward_code, subject }) => {
    const queryString = `${lop ? `lop: [${lop}],` : ``}, 
        ${province_code ? `province_code: ${province_code},` : ``},
        ${district_code ? `district_code: ${district_code}` : ``}
        ${ward_code ? `ward_code: ${ward_code},` : ``}
        ${subject ? `search_infor: "${subject}",` : ``}
        `;
    const query = `{
        search_room (${queryString}) {
          id
          province_code
          district_code
          ward_code
          lop
          subject
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

