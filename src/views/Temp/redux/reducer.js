import {
  SET_SEARCHED_TEMP2S,
  SET_TEMP2S,
  ADD_NEW_TEMP2,
  SET_TEMP2_DETAIL,
  SET_TEMP2_VALUE,
  SET_TEMP2_DEFAULT,
} from './types';
import { SetRegValueHelper, SpreadOps } from 'store/reducerHelpers';

const initialState = {
  rows: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  values: {},
  default: {
    temp3ID: "",
    division: "",
    section: "",
    code: "",
    createdAt: "",
    _id: "",
  },
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_TEMP2S:
      return {
        ...state,
        searched: action.data.temp3s,
        toDisplay: action.data.temp3s,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_TEMP2S:
      return {
        ...state,
        rows: (action.data) ? action.data.temp3s : state.rows,
        toDisplay: (action.data) ? action.data.temp3s : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_TEMP2:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_TEMP2_DETAIL:
      console.log({ ...action.detail.temp3[0] });
      return {
        ...state,
        values: { ...action.detail.temp3[0] }
      }

    case SET_TEMP2_VALUE:
      console.log(action);
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_TEMP2_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }


    default:
      return state

  }
}
