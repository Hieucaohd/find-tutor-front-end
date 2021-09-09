const { server_name, token_prefix } = require("namespace");


export const addParentRoom = async ({token, roomInfor, price}) => {
    try {
        const response = await fetch(`${server_name}/findTutor/roomList/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token_prefix} ${token}`,
            },
            body: JSON.stringify(roomInfor),
        })
        const responseJSON = await response.json();
        await fetch(`${server_name}/findTutor/priceList/?pk_room=${responseJSON.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token_prefix} ${token}`,
            },
            body: JSON.stringify(price),
        })
        return true;
    } catch(error) {
        console.log('Failed to add parent room: ', error);
        return false;
    }
}