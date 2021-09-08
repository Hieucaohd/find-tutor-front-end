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
    const queryString = `${lop ? `lop: ${lop},` : ``}, 
        ${province_code ? `province_code: ${province_code},` : ``},
        ${district_code ? `district_code: ${district_code}` : ``}
        ${ward_code ? `ward_code: ${ward_code},` : ``}
        ${subject ? `search_infor: ${subject},` : ``}
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

