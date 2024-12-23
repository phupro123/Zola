import React from 'react';
import socketio from 'socket.io-client';
import { SOCKET_URL } from '~/configs';

export const socket = socketio.connect(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: true,
  // 'query': { 'username': username }
});
export const SocketContext = React.createContext();
