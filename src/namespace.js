const server_main = 'findtutorapp.website'

const server_django_api = `${server_main}/api`
const server_nodejs_api = `${server_main}/api-chat`

export const server_name = `https://${server_django_api}`;
export const endpoint = `https://${server_django_api}/graphql/`;
export const server_websocket = `wss://${server_main}/ws`;

export const notification_socket = `${server_websocket}/notification/`;
export const room_socket = `${server_websocket}/room/`;


export const server_name_chat_app = `https://${server_nodejs_api}`;
export const endpoint_chat_app = `https://${server_nodejs_api}/graphql`;

export const token_prefix = 'Bearer';