import { fetchGraphQl } from "./graphQl"

export const SearchTutor = (search) => {
    const query = `
    {
        search_tutor(search_infor: "hiệp") {
            id
            user {
                id
            }
            first_name
            last_name
            profession
        }
    }`

    return fetchGraphQl("search tutor", "search_tutor", query);
} 

export const SearchParent = (search) => {
    const query = `
    {
        search_parent(search_infor: ${search}) {
            id
            first_name
            last_name
            profession
        }
    }`

    return fetchGraphQl("search parent", "search_parent", query);
}