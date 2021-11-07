import axios from "axios";
import { endpoint, token_prefix } from "namespace";

export const fetchGraphQl = (name, queryName, query) => {
    return axios({
        method: 'post',
        url: endpoint,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        },
        data: {
            query: query,
        }
    }).then(response => {
            return response.data.data[queryName];
        }).catch(error => {
            console.log("Failed to get " + name + " " + error)
        })
}
