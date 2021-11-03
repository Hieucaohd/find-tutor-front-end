import { endpoint, token_prefix } from "namespace";

export const fetchGraphQl = async (name, queryName, query) => {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({query: query})
        });
        const responseJSON = await response.json();
        return responseJSON.data[queryName];
    } catch(error) {
        console.log(`Failed to fetch ${name}: `, error)
    }

}
