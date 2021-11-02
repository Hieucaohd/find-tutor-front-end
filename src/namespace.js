
// Django
const server_django_http = "https://www.findtutorapp.website";

export const server_name = server_django_http;
export const endpoint = `${server_django_http}/graphql/`;

const server_django_websocket = "wss://www.findtutorapp.website/ws";

export const notification_socket = `${server_django_websocket}/notification/`;
export const room_socket = `${server_django_websocket}/room/`;


// Nodejs
const server_nodejs_http = "https://www.chatapp.findtutorapp.website";

export const server_name_chat_app = server_nodejs_http;
export const endpoint_chat_app = `${server_nodejs_http}/graphql`;

// Token
export const token_prefix = 'Bearer';
