import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SERVER_URI } from '../../config';
import {
  SOCKET_CONNECT,
  ADD_NEW_LOG,
  TOGGLE_ALERT,
} from './../types';

import {
  ArrangeDate
} from './displayAction';

import soundfile from './tspt_danger_alarm_loop_024.mp3'
import soundfile2 from './hand-bell.mp3'
import Sound from 'react-sound';

import io from 'socket.io-client';
import { toast } from 'react-toastify';

const WaitForSocket = (getState, callback) => {
  const waitSocket = setInterval(() => {
    const { socket } = getState();
    if (socket.socket){
      callback(socket);
      clearInterval(waitSocket);
    }
  }, 30);
}

export const SocketFunction = (event, getState, dispatchCallback) => {

  WaitForSocket(getState, (socket) => {
    socket.socket.on(event, (data) => {
      dispatchCallback(data);
    })
  });
}

export const ConnectSocket = () => (dispatch) => {
  const socket = io(SERVER_URI + '/admin');
  socket.on('connect', (err, sconn) => {
    dispatch({
      type: SOCKET_CONNECT,
      socket: socket,
      socketID: socket.id
    });
  });
};

export const ListenLogs = () => (dispatch, getState) => {
  SocketFunction("log-error", getState, (data) => {
    const type= ["info", "info", "warn", "error"]

    toast[type[data.level]](
      <Link to="/log" style={{textDecoration:"none", color:"inherit"}} onClick={() => { dispatch({type:TOGGLE_ALERT, value: false}) }}>
        <div className="log-error">
          <strong className="functionality">{data.functionality}</strong>
          <span className="message">{data.message}</span>
          <span className="location-file">{data.location.split(" -> ")[0]}</span>
          <span className="location-line">{data.location.split(" -> ")[1]}</span>
          <span className="date">{data.date}</span>
        </div>

        <Sound
          loop
          url={soundfile}
          playStatus={Sound.status.PLAYING}
        />

      </Link>
    );

    dispatch({
      type: ADD_NEW_LOG,
      log: data,
    });
  });
}
