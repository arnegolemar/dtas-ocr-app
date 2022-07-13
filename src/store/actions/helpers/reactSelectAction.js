import {  } from '../types';
import axios from 'axios';


export const CurrentReactSelect = (key, type) => dispatch => {
  dispatch({
    type: type,
    key: key,
  })
}
