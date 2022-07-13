import {
  TOGGLE_ALERT,
  CHANGE_SEARCH_VAL,
  SET_SEARCH_SUGGESTIONS,
  SET_SEARCH_DATA,
  DISPLAY_SEARCH_RESULT,
} from '../../types';
import axios from 'axios';
import { SERVER_API, SERVER_URI, JWT } from 'config';

import {
  GetObjectPropValue
} from './displayAction';

export const SearchData = (suggest, api, type, keyword="", reducer, reducer_empty, select, find, sort, page = 1, count = 10) => (dispatch, getState) => {
  if (true){
    axios({
      url: `${SERVER_API}/${api}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      params: {
        value: {
          props: type,
          keyword: keyword,
        },
        filters: {
          page: page,
          count: count,
          find: find,
          sort: sort,
          select: select
        }
      }
    })
    .then((res) =>{
      if (res.data.status) {
        if (suggest){
          dispatch({
            type: SET_SEARCH_SUGGESTIONS,
            data: GetObjectPropValue(res.data.data, "", "array")()
          });
          return true;
        }else {
          dispatch({
            type: reducer,
            data: res.data.data,
            page: page,
          });
          return true;
        }
      }
    })
    .catch(err => {
    });
  }else {
    dispatch({
      type: SET_SEARCH_SUGGESTIONS,
      data: []
    });

    if (reducer_empty){
      dispatch({
        type: reducer_empty
      });
    }
  }
}

export const GetSearchDetail = (api, id, reducer, callback = () => {}) => async (dispatch) => {
  callback(dispatch);
  await axios({
    url: `${SERVER_API}/${api}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(JWT)}`
    },
    params: {
      id: id,
    }
  })
  .then((res) =>{
    if (res.data.success){
      dispatch({
        type: reducer,
        data: res.data.data[0]
      });
    }else {
    }
  });
}

export const SelectSearchOption = (reducer, data, page) => async (dispatch) => {
  console.log("====================!!!");
  console.log(reducer);
  console.log(data);
  console.log(page);
  dispatch({
    type: reducer,
    data: data,
    page: page,
  });

  dispatch({
    type: SET_SEARCH_SUGGESTIONS,
    data: []
  });
}

export const SearchUser = (keyword, type) => (dispatch) => {
  axios({
    url: `${SERVER_API}/report/alluser/search`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(JWT)}`
    },
    params: {
      keyword: keyword,
      type: type
    }
  })
  .then(res => {
      dispatch({
        type: DISPLAY_SEARCH_RESULT,
        passenger: res.data.Passenger,
        driver: res.data.Driver,
      });
  })
  .catch(err => {
  });
}
