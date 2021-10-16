const server_main = 'ec2-54-179-117-11.ap-southeast-1.compute.amazonaws.com'

export const server_name = `http://${server_main}`;
export const endpoint = `http://${server_main}/graphql/`;
export const server_websocket = `ws://${server_main}/ws`;

export const notification_socket = `${server_websocket}/notification/`;
export const room_socket = `${server_websocket}/room/`;

export const server_name_chat_app = 'https://tim-gia-su-chat.herokuapp.com';
export const endpoint_chat_app = 'https://tim-gia-su-chat.herokuapp.com/graphql';

export const token_prefix = 'Bearer';