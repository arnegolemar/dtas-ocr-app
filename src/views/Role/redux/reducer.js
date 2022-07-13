import {
  SET_SEARCHED_ROLES,
  SET_ROLES,
  ADD_NEW_ROLE,
  SET_ROLE_DETAIL,
  SET_ROLE_VALUE,
  SET_ROLE_DEFAULT,
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
    name: "",
    routes: [],
    systems: [],
    _id: ""
  },
  tempFiles: [],
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_ROLES:
      return {
        ...state,
        searched: action.data.roles,
        toDisplay: action.data.roles,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_ROLES:
      return {
        ...state,
        rows: (action.data) ? action.data.roles : state.rows,
        toDisplay: (action.data) ? action.data.roles : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_ROLE:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_ROLE_DETAIL:
      console.log({ ...action.detail.role[0] });
      return {
        ...state,
        values: { ...action.detail.role[0] }
      }

    case SET_ROLE_VALUE:
      console.log(action);
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_ROLE_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }


    default:
      return state

  }
}
