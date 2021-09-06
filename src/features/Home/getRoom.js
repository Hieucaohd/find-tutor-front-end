import { server_name } from "../../namespace";
const queryString = require('query-string');

export const fetchRoomList = async () => {
    try {
        const response = await fetch(`${server_name}/findTutor/roomList/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        });
        const responseJSON = await response.json();
        return responseJSON;
    } catch(error) {
        console.log('Failed to fetch room list: ', error);
    }
}

export const fetchFilterRoomList = async ({lop, params}) => {
    try {
            const paramsString = `&${queryString.stringify(params)}`;
            console.log(paramsString);
            const response = await fetch(`${server_name}/search/?type=room${paramsString}&lop=${lop}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            });
            const responseJSON = await response.json();
            return responseJSON;
        
    } catch(error) {
        console.log("failed to fetch filter room list: ", error);
    }
}



