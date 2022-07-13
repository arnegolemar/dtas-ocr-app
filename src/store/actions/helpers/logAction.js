import {
  DISPLAY_LOGS,
  GET_LOG,
  LOG_VIEWED,
  LOG_RESOLVED,
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_USER_COMMENT,
  SET_LOG_COMMENT
} from './../types';
import { SERVER_URI } from '../../config';
import axios from 'axios';

// ============================================ TRICYCLE ============================================
export const GetLogs = (page = 1) => (dispatch) => {
  axios({
    url: `${SERVER_URI}/api/log`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    params: {
      number: page
    }
  })
    .then(res => {
      console.log(res);
      dispatch({
        type: DISPLAY_LOGS,
        logs: res.data.log,
        logsCount: res.data.count,
      })
    })
    .catch(err => {
    });
}

export const ResolveLog = (id, comment) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Changing Log Status"
  })
  axios({
    url: `${SERVER_URI}/api/log/resolved`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: {
      id: id,
      comment: comment
    }
  })
    .then(res => {
      if (res.data.success){
        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "Log Resolved"
        })

        dispatch({
          type: LOG_RESOLVED,
          id: id,
        })
      }
    })
    .catch(err => {
    });

}

export const GetLog = (index) => (dispatch, getState) => {
  const { log } = getState();
  if (!log.logs[index].viewed){
    axios({
      url: `${SERVER_URI}/api/log/viewed`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        id: log.logs[index]._id
      }
    })
      .then(res => {
        if (res.data.success){
          dispatch({
            type: LOG_VIEWED,
            index: index,
          })
        }
      })
      .catch(err => {
      });
  }

  dispatch({
    type: GET_LOG,
    index: index,
  })
}

export const SendUserLog = (value, location) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Sending Comment"
  })
  var username = "username";
  axios({
    url: `${SERVER_URI}/api/log/usercomment`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: {
      message: value,
      level: 0,
      functionality: "User Comment (User: " + username + ")",
      location: location
    }
  })
    .then(res => {
      if(res.data.success){
        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "Comment Sent"
        })
        dispatch({
          type: SET_USER_COMMENT,
          value: ""
        })
      }
    })
    .catch(err => {
    });
}

export const SetLogComment = (value, id) => (dispatch) => {
  dispatch({
    type: SET_LOG_COMMENT,
    value: value,
    id: id,
  })
}

export const SetUserLog = (value) => (dispatch) => {
  dispatch({
    type: SET_USER_COMMENT,
    value: value
  })
}
