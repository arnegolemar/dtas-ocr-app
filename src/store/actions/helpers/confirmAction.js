import { 
  TOGGLE_CONFIRMATION 
} from '../types';

export const togglePasswordRequire = (bool) => (dispatch) => {
  console.log("::*&&&&&&&&&&&&&&&&&&&&");
  console.log(bool);
  dispatch({
    type: TOGGLE_CONFIRMATION,
    show: bool,
  })
}
