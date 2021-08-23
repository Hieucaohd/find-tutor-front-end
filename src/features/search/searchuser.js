import { server_name } from "../../namespace"

export const searchUser = async ({name}) => {
    try {
        const response = await fetch(`${server_name}/search/?search=${name}&type=people`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        });
        const responseJSON= await response.json();
        console.log(responseJSON);
    } catch(error) {
        console.log('Failed to fetch search user: ', error);
    }
}