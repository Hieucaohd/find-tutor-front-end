import { fetchGraphQl } from "./graphQl"

export const SearchTutor = async (search, token) => {
    const query = `
    {
        search_tutor(search_infor: "${search}") {
            result {
                id
                user {
                    id
                    username
                    imageprivateusermodel{
                        avatar
                    }
                }
                first_name
                last_name
                profession
            }
        }
    }`

    const searchModel =  await fetchGraphQl("search tutor", "search_tutor", query, token);
    const tutorList = await searchModel?.result;
    return tutorList;
} 

export const SearchParent = async (search, token) => {
    const query = `
    {
        search_parent(search_infor: "${search}") {
            result {
                id
                user {
                    id
                    username
                    imageprivateusermodel{
                        avatar
                    }
                }
                first_name
                last_name
            }
        }
    }`

    const searchModel = await fetchGraphQl("search parent", "search_parent", query, token);
    const searchList = await searchModel?.result;
    return searchList;
}