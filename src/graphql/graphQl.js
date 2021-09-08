import { endpoint } from "namespace";

export const fetchGraphQl = async (name, queryName, query  ) => {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({query: query})
        });
        const responseJSON = await response.json();
        return responseJSON.data[queryName];
    } catch(error) {
        console.log(`Failed to fetch ${name}: `, error)
    }
}