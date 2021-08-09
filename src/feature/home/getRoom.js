import { server_name, token_prefix } from "../../namespace";
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
        if(lop) {
            const paramsString = queryString.stringify(params);
            const response = await fetch(`${server_name}/search/?type=room&${paramsString}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({"lop": [
                    8
                ]}),
            });
            const responseJSON = await response.json();
            return responseJSON;
        } else {
            const paramsString = queryString.stringify(params);
            const response = await fetch(`${server_name}/search/?type=room&${paramsString}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            });
            const responseJSON = await response.json();
            return responseJSON;
        }
    } catch(error) {
        console.log("failed to fetch filter room list: ", error);
    }
}