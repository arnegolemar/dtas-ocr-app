import { TOGGLE_ALERT } from 'store/types';
import axios from 'axios';


export const ToggleAlert = (type, msg, val) => dispatch => {
  console.log("::::::");
  dispatch({
    type: TOGGLE_ALERT,
    resType: type,
    msg: msg,
    value: val
  })
}

export const Nigate = () => getState => {
  const store = getState();

  store.alert.toggle = false;
}

export const Delay = (cb, time = 1000) => {
  var timer = setTimeout(() => {

    cb();

    clearTimeout(timer);
  }, time);
}
