import {
  SET_SEARCHED_POSITIONS,
  SET_POSITIONS,
  ADD_NEW_POSITION,
  SET_POSITION_DETAIL,
  SET_POSITION_VALUE,
  SET_POSITION_DEFAULT,
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
    positionID: "",
    name: "",
    createdAt: "",
    _id: "",
  },
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_POSITIONS:
      return {
        ...state,
        searched: action.data.positions,
        toDisplay: action.data.positions,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_POSITIONS:
      return {
        ...state,
        rows: (action.data) ? action.data.positions : state.rows,
        toDisplay: (action.data) ? action.data.positions : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_POSITION:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_POSITION_DETAIL:
      console.log({ ...action.detail.position[0] });
      return {
        ...state,
        values: { ...action.detail.position[0] }
      }

    case SET_POSITION_VALUE:
      console.log(action);
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_POSITION_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }


    default:
      return state

  }
}
